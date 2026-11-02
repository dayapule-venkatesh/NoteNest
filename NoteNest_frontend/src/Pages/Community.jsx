import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  Hash,
  Loader2,
  MessagesSquare,
  Send,
  ShieldCheck,
  Smile,
  Sparkles,
  Trash2,
  Users,
  Wifi,
  WifiOff,
  X,
} from "lucide-react";
import PageHeader from "../Components/PageHeader";
import { useCommunityChat } from "../hooks/useCommunityChat";
import { toast } from "../utils/toast";

const AVATAR_COLORS = [
  "bg-rose-100 text-rose-800",
  "bg-[#e7edf0] text-[#48606e]",
  "bg-brand-100 text-brand-800",
  "bg-amber-100 text-amber-800",
  "bg-accent-100 text-accent-800",
  "bg-[#efe8d8] text-[#6b5737]",
];

const EMOJIS = ["👋", "✨", "🙌", "🔥", "💡", "😊"];

const avatarColor = (name = "") => {
  const total = [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return AVATAR_COLORS[total % AVATAR_COLORS.length];
};

const initials = (name = "?") =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const senderId = (message) =>
  typeof message?.sender === "object" ? message.sender?._id : message?.sender;

const dayLabel = (date) => {
  const value = new Date(date);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (value.toDateString() === today.toDateString()) return "Today";
  if (value.toDateString() === yesterday.toDateString()) return "Yesterday";

  return value.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

const timeLabel = (date) =>
  new Date(date).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });

const Community = () => {
  const currentUser = useSelector(
    (state) => state.userDetails.userdata?.message,
  );
  const {
    messages,
    presence,
    typingUsers,
    connected,
    connectionNote,
    clearConnectionNote,
    loading,
    sendMessage,
    deleteMessage,
    setTyping,
  } = useCommunityChat();

  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [emojiOpen, setEmojiOpen] = useState(false);

  const bottomRef = useRef(null);
  const typingTimer = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: messages.length > 1 ? "smooth" : "auto",
    });
  }, [messages.length, typingUsers.length]);

  useEffect(
    () => () => {
      if (typingTimer.current) window.clearTimeout(typingTimer.current);
      setTyping(false);
    },
    [setTyping],
  );

  const typingLabel = useMemo(() => {
    if (!typingUsers.length) return "";
    if (typingUsers.length === 1) return `${typingUsers[0].name} is typing`;
    if (typingUsers.length === 2) {
      return `${typingUsers[0].name} and ${typingUsers[1].name} are typing`;
    }
    return `${typingUsers.length} people are typing`;
  }, [typingUsers]);

  const handleChange = (event) => {
    setText(event.target.value);

    setTyping(true);
    if (typingTimer.current) window.clearTimeout(typingTimer.current);
    typingTimer.current = window.setTimeout(() => setTyping(false), 1400);
  };

  const handleSend = async () => {
    const cleanText = text.trim();
    if (!cleanText || sending) return;

    setSending(true);
    setTyping(false);
    if (typingTimer.current) window.clearTimeout(typingTimer.current);

    const success = await sendMessage(cleanText);
    if (success) {
      setText("");
      setEmojiOpen(false);
    } else {
      toast.error("Message could not be sent. Please try again.");
    }

    setSending(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const addEmoji = (emoji) => {
    setText((current) => `${current}${emoji}`);
    setEmojiOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Community"
        title="The NoteNest commons"
        description="Share ideas, ask questions and meet other note-makers. Be kind — every voice makes the nest better."
        actions={
          <div className="flex items-center gap-2">
            <span className="badge-neutral">
              <Users className="size-3.5" />
              {presence.online} online
            </span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${
                connected
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-amber-200 bg-amber-50 text-amber-700"
              }`}
            >
              {connected ? <Wifi className="size-3.5" /> : <WifiOff className="size-3.5" />}
              {connected ? "Live" : "Auto-refresh"}
            </span>
          </div>
        }
      />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
        <section className="card flex h-[calc(100vh-265px)] min-h-[560px] flex-col overflow-hidden">
          <header className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Hash className="size-5" />
              </div>
              <div>
                <h2 className="font-display text-base font-bold text-ink">general</h2>
                <p className="text-xs text-muted">A cozy corner for every note-maker</p>
              </div>
            </div>

            <div className="flex -space-x-2">
              {presence.users.slice(0, 4).map((user) => (
                <span
                  key={user._id}
                  title={user.name}
                  className={`flex size-8 items-center justify-center rounded-full border-2 border-white text-[10px] font-bold ${avatarColor(user.name)}`}
                >
                  {initials(user.name)}
                </span>
              ))}
            </div>
          </header>

          {connectionNote ? (
            <div className="flex items-center gap-2 border-b border-amber-100 bg-amber-50 px-5 py-2.5 text-xs font-medium text-amber-800">
              <WifiOff className="size-3.5 shrink-0" />
              <span className="flex-1">{connectionNote}</span>
              <button
                type="button"
                aria-label="Dismiss connection message"
                onClick={clearConnectionNote}
                className="rounded p-0.5 opacity-60"
              >
                <X className="size-3.5" />
              </button>
            </div>
          ) : null}

          <div className="flex-1 overflow-y-auto bg-[radial-gradient(rgba(28,37,30,0.055)_0.7px,transparent_0.7px)] px-4 py-5 [background-size:20px_20px] sm:px-5">
            {loading ? (
              <div className="space-y-5">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex gap-3">
                    <div className="skeleton size-9 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <div className="skeleton h-3 w-28" />
                      <div className="skeleton h-14 w-3/4 rounded-2xl" />
                    </div>
                  </div>
                ))}
              </div>
            ) : messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                <div className="flex size-16 items-center justify-center rounded-2xl border border-brand-200 bg-brand-50 text-brand-700">
                  <MessagesSquare className="size-7" />
                </div>
                <h2 className="mt-4 font-display text-xl font-bold text-ink">
                  Start the conversation
                </h2>
                <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
                  Say hello, share what you're working on, or ask the community for
                  a second opinion.
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                {messages.map((message, index) => {
                  const sender = message.sender || {};
                  const own = senderId(message) === currentUser?._id;
                  const previous = messages[index - 1];
                  const showDay =
                    !previous ||
                    new Date(previous.createdAt).toDateString() !==
                      new Date(message.createdAt).toDateString();
                  const grouped =
                    previous &&
                    senderId(previous) === senderId(message) &&
                    new Date(message.createdAt).getTime() -
                      new Date(previous.createdAt).getTime() <
                      5 * 60 * 1000;

                  return (
                    <div key={message._id}>
                      {showDay ? (
                        <div className="my-5 flex items-center gap-3">
                          <span className="h-px flex-1 bg-[#f1ede4]" />
                          <span className="rounded-full border border-line bg-paper px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-muted shadow-sm">
                            {dayLabel(message.createdAt)}
                          </span>
                          <span className="h-px flex-1 bg-[#f1ede4]" />
                        </div>
                      ) : null}

                      <div
                        className={`group flex items-end gap-2.5 ${own ? "flex-row-reverse" : ""} ${grouped ? "mt-1" : "mt-4"}`}
                      >
                        {!own ? (
                          <div className={`size-8 shrink-0 ${grouped ? "opacity-0" : ""}`}>
                            {sender.profile ? (
                              <img
                                src={sender.profile}
                                alt={sender.name || "Member"}
                                className="size-8 rounded-full border border-white object-cover shadow-sm"
                              />
                            ) : (
                              <div
                                className={`flex size-8 items-center justify-center rounded-full text-[10px] font-bold ${avatarColor(sender.name)}`}
                              >
                                {initials(sender.name)}
                              </div>
                            )}
                          </div>
                        ) : null}

                        <div className={`max-w-[78%] ${own ? "items-end" : "items-start"}`}>
                          {!own && !grouped ? (
                            <p className="mb-1 pl-1 text-[11px] font-semibold text-muted">
                              {sender.name || "NoteNest member"}
                            </p>
                          ) : null}

                          <div
                            className={`rounded-2xl px-4 py-2.5 text-sm leading-6 shadow-sm ${
                              own
                                ? "rounded-br-md bg-forest text-paper"
                                : "rounded-bl-md border border-line bg-paper text-body"
                            }`}
                          >
                            <p className="whitespace-pre-wrap break-words">{message.text}</p>
                          </div>

                          <div
                            className={`mt-1 flex items-center gap-2 px-1 text-[10px] text-muted ${own ? "justify-end" : ""}`}
                          >
                            <span>{timeLabel(message.createdAt)}</span>
                            {own ? (
                              <button
                                type="button"
                                onClick={() => deleteMessage(message._id)}
                                aria-label="Delete message"
                                title="Delete message"
                                className="rounded p-0.5 opacity-0 transition hover:text-rose-500 group-hover:opacity-100"
                              >
                                <Trash2 className="size-3" />
                              </button>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={bottomRef} />
              </div>
            )}
          </div>

          <div className="border-t border-line bg-paper px-4 py-3 sm:px-5">
            <div className="mb-2 flex h-5 items-center gap-2 px-1">
              {typingLabel ? (
                <>
                  <span className="flex gap-0.5">
                    <span className="typing-dot size-1.5 rounded-full bg-accent-500" />
                    <span className="typing-dot size-1.5 rounded-full bg-accent-500" />
                    <span className="typing-dot size-1.5 rounded-full bg-accent-500" />
                  </span>
                  <span className="text-[11px] font-medium text-muted">
                    {typingLabel}…
                  </span>
                </>
              ) : null}
            </div>

            {emojiOpen ? (
              <div className="mb-2 flex flex-wrap gap-1 rounded-xl border border-line bg-[#f7f4ec] p-2">
                {EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => addEmoji(emoji)}
                    className="rounded-lg px-2 py-1 text-lg transition hover:bg-brand-50"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            ) : null}

            <div className="flex items-end gap-2 rounded-2xl border border-line bg-paper p-2 shadow-sm transition focus-within:border-brand-400 focus-within:ring-4 focus-within:ring-brand-500/10">
              <button
                type="button"
                onClick={() => setEmojiOpen((open) => !open)}
                aria-label="Add emoji"
                className="mb-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl text-muted transition hover:bg-brand-50 hover:text-brand-800"
              >
                <Smile className="size-5" />
              </button>

              <textarea
                value={text}
                rows={1}
                maxLength={1000}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Share something with the community…"
                className="max-h-28 min-h-9 flex-1 resize-none border-0 bg-transparent px-1 py-2 text-sm text-body outline-none placeholder:text-muted"
              />

              <button
                type="button"
                onClick={handleSend}
                disabled={!text.trim() || sending}
                className="mb-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-forest text-paper shadow-lg shadow-forest/20 transition hover:-translate-y-0.5 hover:bg-brand-800 disabled:opacity-40"
                aria-label="Send message"
              >
                {sending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Send className="size-4" />
                )}
              </button>
            </div>

            <div className="mt-2 flex items-center justify-between px-1">
              <p className="text-[10px] text-muted">
                Enter to send · Shift + Enter for a new line
              </p>
              {text.length > 800 ? (
                <p className="text-[10px] font-semibold text-amber-600">
                  {text.length}/1000
                </p>
              ) : null}
            </div>
          </div>
        </section>

        <aside className="space-y-5">
          <div className="card p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-sm font-bold text-ink">Who's here</h2>
              <span className="badge-neutral">{presence.online}</span>
            </div>

            <div className="mt-4 space-y-3">
              {presence.users.length ? (
                presence.users.map((user) => (
                  <div key={user._id} className="flex items-center gap-3">
                    {user.profile ? (
                      <img
                        src={user.profile}
                        alt={user.name}
                        className="size-9 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className={`flex size-9 items-center justify-center rounded-full text-[10px] font-bold ${avatarColor(user.name)}`}
                      >
                        {initials(user.name)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-ink">
                        {user.name}
                      </p>
                      <p className="flex items-center gap-1 text-[10px] text-emerald-600">
                        <span className="size-1.5 rounded-full bg-emerald-500" />
                        Online
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs leading-5 text-muted">
                  You're the first one here. The community will appear as people join.
                </p>
              )}
            </div>
          </div>

          <div className="card p-5">
            <div className="flex items-center gap-2 text-brand-700">
              <ShieldCheck className="size-4" />
              <h2 className="font-display text-base font-semibold">House rules</h2>
            </div>
            <ul className="mt-3 space-y-2.5 text-xs leading-5 text-muted">
              <li>Be kind and assume good intent.</li>
              <li>No spam, self-promotion or unsafe links.</li>
              <li>Keep feedback constructive and specific.</li>
              <li>Share ideas — someone may need them today.</li>
            </ul>
          </div>

          <div className="sidebar-texture rounded-3xl p-5 text-white shadow-xl shadow-forest/15">
            <div className="flex items-center gap-2 text-accent-200">
              <Sparkles className="size-4" />
              <p className="text-xs font-bold uppercase tracking-wider">Community prompt</p>
            </div>
            <p className="mt-3 font-display text-xl font-semibold leading-snug">
              What's one note you're glad you wrote down?
            </p>
            <p className="mt-2 text-xs leading-5 text-white/50">
              Drop it in #general and see where the conversation goes.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Community;
