import { useState } from "react";
import axios from "axios";
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  MailCheck,
  ShieldCheck,
} from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AuthShell from "../Components/AuthShell";
import { API_URL } from "../Features/API";
import { toast } from "../utils/toast";

const Otp = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (event) => {
    event?.preventDefault();
    if (otp.trim().length < 4) {
      setError("Enter the 4-digit code from your email.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${API_URL}/api/auth/checkotp`,
        { otp: otp.trim(), email },
        { withCredentials: true },
      );

      if (response.data.status) {
        toast.success("Email verified. Welcome to NoteNest!");
        navigate("/login");
      } else {
        setError(response.data.message || "That code did not work.");
      }
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          "We could not verify that code. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Check your inbox"
      subtitle={
        email
          ? `We sent a 4-digit verification code to ${email}.`
          : "We sent a 4-digit verification code to your email."
      }
      panelTitle="One tiny code between you and your new nest."
      panelText="Verifying your email keeps your notes, AI summaries and community profile safe."
      footer={
        <Link
          to="/signup"
          className="inline-flex items-center gap-1.5 font-semibold text-brand-700 hover:text-brand-800"
        >
          <ArrowLeft className="size-3.5" />
          Use a different email
        </Link>
      }
    >
      <form onSubmit={handleVerify} className="space-y-5">
        {error ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
            {error}
          </div>
        ) : null}

        {!email ? (
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            This page needs an email address. Please sign up again.
          </div>
        ) : null}

        <div>
          <label htmlFor="otp" className="label">
            Verification code
          </label>
          <div className="relative">
            <MailCheck className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              id="otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={4}
              value={otp}
              onChange={(event) =>
                setOtp(event.target.value.replace(/\D/g, "").slice(0, 4))
              }
              placeholder="• • • •"
              className="input py-4 pl-10 text-center font-display text-2xl font-bold tracking-[0.4em]"
            />
          </div>
          <p className="mt-2 text-xs text-muted">
            The code expires in 5 minutes. Check your spam folder if it's not there.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || !email}
          className="btn-primary w-full py-3"
        >
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Verifying…
            </>
          ) : (
            <>
              Verify email
              <ArrowRight className="size-4" />
            </>
          )}
        </button>

        <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted">
          <ShieldCheck className="size-3.5 text-emerald-500" />
          Your code is single-use and expires automatically
        </p>
      </form>
    </AuthShell>
  );
};

export default Otp;
