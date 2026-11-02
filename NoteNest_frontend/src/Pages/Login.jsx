import { useState } from "react";
import { Form, Link, useActionData, useNavigation } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";
import AuthShell from "../Components/AuthShell";

const Login = () => {
  const actionData = useActionData();
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const submitting = navigation.state === "submitting";

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to pick up exactly where you left off."
      panelTitle="Your notes missed you. So did your best ideas."
      panelText="Come back to a workspace that keeps your thoughts organized, summarized and ready when you are."
      footer={
        <>
          New to NoteNest?{" "}
          <Link to="/signup" className="font-semibold text-brand-700 hover:text-brand-800">
            Create an account
          </Link>
        </>
      }
    >
      <Form method="post" className="space-y-5">
        {actionData?.error ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
            {actionData.error}
          </div>
        ) : null}

        <div>
          <label htmlFor="email" className="label">
            Email address
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              className="input pl-10"
            />
          </div>
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-semibold text-ink">
              Password
            </label>
            <Link
              to="/forgot"
              className="text-xs font-semibold text-brand-600 hover:text-brand-800"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              required
              placeholder="Enter your password"
              className="input px-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted transition hover:text-body"
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-muted">
          <input
            type="checkbox"
            name="remember"
            className="size-4 rounded border-line text-brand-600 accent-brand-600"
          />
          Keep me signed in
        </label>

        <button type="submit" disabled={submitting} className="btn-primary w-full py-3">
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Signing in…
            </>
          ) : (
            <>
              Sign in
              <ArrowRight className="size-4" />
            </>
          )}
        </button>

        <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted">
          <ShieldCheck className="size-3.5 text-emerald-500" />
          Secure login · Your notes stay private
        </p>
      </Form>
    </AuthShell>
  );
};

export default Login;
