/**
 * AI service layer.
 *
 * Provider order:
 *   1. Gemini  (GEMINI_API_KEY)
 *   2. OpenAI  (OPENAI_API_KEY)
 *   3. Local extractive summarizer (always available, no key needed)
 *
 * The controller stays thin and this file owns all AI-provider details.
 */

const STOP_WORDS = new Set(
  "a about above after again against all am an and any are aren't as at be because been before being below between both but by can't cannot could couldn't did didn't do does doesn't doing don't down during each few for from further had hadn't has hasn't have haven't having he he'd he'll he's her here here's hers herself him himself his how how's i i'd i'll i'm i've if in into is isn't it it's its itself let's me more most mustn't my myself no nor not of off on once only or other ought our ours ourselves out over own same shan't she she'd she'll she's should shouldn't so some such than that that's the their theirs them themselves then there there's these they they'd they'll they're they've this those through to too under until up very was wasn't we we'd we'll we're we've were weren't what what's when when's where where's which while who who's whom why why's with won't would wouldn't you you'd you'll you're you've your yours yourself yourselves also just like make made note notes will can may".split(
    " ",
  ),
);

const ENTITY_MAP = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  ndash: "–",
  mdash: "—",
  hellip: "…",
  rsquo: "’",
  lsquo: "‘",
  rdquo: "”",
  ldquo: "“",
};

const decodeEntities = (value) =>
  value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, entity) => {
    if (entity[0] === "#") {
      const isHex = entity[1]?.toLowerCase() === "x";
      const code = Number.parseInt(entity.slice(isHex ? 2 : 1), isHex ? 16 : 10);
      return Number.isNaN(code) ? match : String.fromCodePoint(code);
    }

    return ENTITY_MAP[entity.toLowerCase()] ?? match;
  });

export const htmlToPlainText = (html = "") =>
  decodeEntities(
    String(html)
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<\/(p|div|h[1-6]|li|blockquote|tr|section|article)>/gi, " ")
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();

const splitSentences = (text) =>
  (text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [])
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 25);

const localSummary = (text, maxSentences = 4) => {
  const sentences = splitSentences(text);

  if (sentences.length <= 1) {
    return text;
  }

  const frequency = new Map();
  for (const word of text.toLowerCase().match(/[a-z0-9']+/g) || []) {
    if (STOP_WORDS.has(word) || word.length < 3) continue;
    frequency.set(word, (frequency.get(word) || 0) + 1);
  }

  const scored = sentences.map((sentence, index) => {
    const words = sentence.toLowerCase().match(/[a-z0-9']+/g) || [];
    const meaningfulWords = words.filter((word) => !STOP_WORDS.has(word));
    const score =
      meaningfulWords.reduce((total, word) => total + (frequency.get(word) || 0), 0) /
      Math.sqrt(Math.max(meaningfulWords.length, 1));

    // Slightly favour the opening sentences of a note.
    return { sentence, index, score: score + (sentences.length - index) * 0.15 };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.min(maxSentences, sentences.length))
    .sort((a, b) => a.index - b.index)
    .map((item) => `• ${item.sentence}`)
    .join("\n");
};

const normalizeSummary = (value) =>
  String(value || "")
    .replace(/\r/g, "")
    .replace(/^\s*[-*]\s+/gm, "• ")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

const buildPrompt = (note) => {
  const title = note?.title || "Untitled note";
  const content = htmlToPlainText(note?.note || "").slice(0, 12000);

  return `You are NoteNest's writing assistant. Summarize the note below in 3 to 5 short bullet points.

Rules:
- Keep the author's meaning and important details.
- Be concise and useful, not generic.
- Return plain text only (no markdown headings or code fences).
- Start each bullet with "• ".

Note title: ${title}

Note content:
${content}`;
};

const getConfiguredProvider = () => {
  const forced = String(process.env.AI_PROVIDER || "").toLowerCase();

  if (forced === "gemini" && process.env.GEMINI_API_KEY) return "gemini";
  if (forced === "openai" && process.env.OPENAI_API_KEY) return "openai";
  if (process.env.GEMINI_API_KEY) return "gemini";
  if (process.env.OPENAI_API_KEY) return "openai";

  return "local";
};

const summarizeWithGemini = async (prompt) => {
  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.3, maxOutputTokens: 500 },
      }),
      signal: AbortSignal.timeout(20000),
    },
  );

  if (!response.ok) {
    throw new Error(`Gemini request failed with status ${response.status}`);
  }

  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts
    ?.map((part) => part.text)
    .join("")
    ?.trim();
};

const summarizeWithOpenAI = async (prompt) => {
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.3,
      max_tokens: 500,
      messages: [{ role: "user", content: prompt }],
    }),
    signal: AbortSignal.timeout(20000),
  });

  if (!response.ok) {
    throw new Error(`OpenAI request failed with status ${response.status}`);
  }

  const data = await response.json();
  return data?.choices?.[0]?.message?.content?.trim();
};

export const GetAIStatusService = () => {
  const provider = getConfiguredProvider();

  if (provider === "gemini") {
    return { provider, model: process.env.GEMINI_MODEL || "gemini-2.5-flash" };
  }

  if (provider === "openai") {
    return { provider, model: process.env.OPENAI_MODEL || "gpt-4o-mini" };
  }

  return { provider: "local", model: "built-in extractive summarizer" };
};

export const GenerateSummaryService = async ({ note }) => {
  const title = note?.title || "Untitled note";
  const body = htmlToPlainText(note?.note || "");

  if (!body) {
    return {
      summary: "This note doesn't have any text yet. Add some content and try again.",
      provider: "local",
      fallback: false,
    };
  }

  // A short note does not need an external API call.
  if (body.length < 220) {
    return {
      summary: body,
      provider: "local",
      fallback: false,
    };
  }

  const provider = getConfiguredProvider();

  if (provider === "local") {
    return {
      summary: localSummary(body),
      provider: "local",
      fallback: false,
    };
  }

  try {
    const prompt = buildPrompt({ ...note, title });
    const rawSummary =
      provider === "gemini"
        ? await summarizeWithGemini(prompt)
        : await summarizeWithOpenAI(prompt);

    if (!rawSummary) {
      throw new Error("The AI provider returned an empty summary");
    }

    return {
      summary: normalizeSummary(rawSummary),
      provider,
      fallback: false,
    };
  } catch (error) {
    // Keep the feature usable even when a key expires or the provider is down.
    console.error("AI summary failed, using local fallback:", error.message);

    return {
      summary: localSummary(body),
      provider: "local",
      fallback: true,
      notice: "The AI provider was unavailable, so a local summary was created.",
    };
  }
};
