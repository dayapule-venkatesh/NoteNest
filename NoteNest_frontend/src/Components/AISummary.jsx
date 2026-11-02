import { useState } from "react";
import axios from "axios";
import {
  Check,
  Copy,
  Cpu,
  RefreshCw,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { API_URL } from "../Features/API";
import { toast } from "../utils/toast";

const providerLabel = {
  gemini: "Powered by Gemini",
  openai: "Powered by OpenAI",
  local: "Smart local summary",
};

const AISummary = ({ noteId }) => {
  const [summary, setSummary] = useState("");
  const [provider, setProvider] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateSummary = async () => {
    if (!noteId || loading) return;

    setLoading(true);
    setNotice("");

    try {
      const response = await axios.post(
        `${API_URL}/api/ai/summary`,
        { noteId },
        { withCredentials: true },
      );

      if (response.data.status) {
        setSummary(response.data.summary);
        setProvider(response.data.provider);
        setNotice(response.data.notice || "");
      } else {
        toast.error(response.data.message || "Could not summarize this note");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "The summary service is unavailable right now",
      );
    } finally {
      setLoading(false);
    }
  };

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      toast.success("Summary copied to clipboard");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy the summary");
    }
  };

  const ProviderIcon = provider === "local" ? Cpu : Sparkles;

  return (
    <section className="card overflow-hidden">
      <div className="sidebar-texture relative overflow-hidden px-5 py-5 text-white">
        <div className="relative flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-accent-200">
              <WandSparkles className="size-4" />
              <p className="text-[10px] font-bold uppercase tracking-[0.18em]">
                NoteNest AI
              </p>
            </div>
            <h2 className="mt-2 font-display text-xl font-semibold leading-snug">
              Turn this note into a quick recap
            </h2>
          </div>
          <span className="whitespace-nowrap rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[10px] font-bold text-white/70">
            30s
          </span>
        </div>
      </div>

      <div className="p-5">
        {loading ? (
          <div className="space-y-2.5" aria-live="polite">
            <div className="ai-loading h-3.5 w-full rounded-full" />
            <div className="ai-loading h-3.5 w-11/12 rounded-full" />
            <div className="ai-loading h-3.5 w-4/5 rounded-full" />
            <div className="ai-loading h-3.5 w-2/3 rounded-full" />
            <p className="pt-2 text-xs font-semibold text-brand-700">
              Reading your note…
            </p>
          </div>
        ) : summary ? (
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="badge">
                <ProviderIcon className="size-3" />
                {providerLabel[provider] || "AI summary"}
              </span>
            </div>

            <p className="whitespace-pre-line text-sm leading-6 text-body">
              {summary}
            </p>

            {notice ? (
              <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] leading-5 text-amber-900">
                {notice}
              </p>
            ) : null}

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={generateSummary}
                className="btn-secondary px-3.5 py-2 text-xs"
              >
                <RefreshCw className="size-3.5" />
                Regenerate
              </button>
              <button
                type="button"
                onClick={copySummary}
                className="btn-ghost px-3.5 py-2 text-xs"
              >
                {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-sm leading-6 text-muted">
              Get the key ideas from this note in a few seconds. Your note is only
              sent to the AI provider when you ask for a summary.
            </p>
            <button
              type="button"
              onClick={generateSummary}
              disabled={!noteId}
              className="btn-primary mt-4 w-full"
            >
              <Sparkles className="size-4" />
              Summarize with AI
            </button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-muted">
              <Cpu className="size-3" />
              Works even without an API key, using a local summarizer
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AISummary;
