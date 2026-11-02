import { useState } from "react";
import { Form, Link, useActionData, useNavigation } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
} from "lucide-react";
import AuthShell from "../Components/AuthShell";

const Signup = () => {
  const actionData = useActionData();
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const submitting = navigation.state === "submitting";

  return (
    <AuthShell
      title="Create your nest"
      subtitle="One account for your notes, AI recaps and the community."
      panelTitle="Give every idea a place to land."
      panelText="Start free, write beautifully, and let AI and the community help you keep the momentum."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-brand-700 hover:text-brand-800">
            Log in
          </Link>
        </>
      }
    >
      <Form method="post" className="space-y-4">
        {actionData?.error ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
            {actionData.error}
          </div>
        ) : null}

        <div>
          <label htmlFor="name" className="label">
            Full name
          </label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              id="name"
              type="text"
              name="name"
              autoComplete="name"
              required
              minLength={3}
              placeholder="Maya Sharma"
              className="input pl-10"
            />
          </div>
        </div>

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
          <label htmlFor="password" className="label">
            Password
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="new-password"
              required
              minLength={8}
              placeholder="At least 8 characters"
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

        <div>
          <label htmlFor="confirm_password" className="label">
            Confirm password
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              id="confirm_password"
              type={showPassword ? "text" : "password"}
              name="confirm_password"
              autoComplete="new-password"
              required
              minLength={8}
              placeholder="Repeat your password"
              className="input pl-10"
            />
          </div>
        </div>

        <button type="submit" disabled={submitting} className="btn-primary w-full py-3">
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Creating account…
            </>
          ) : (
            <>
              Create free account
              <ArrowRight className="size-4" />
            </>
          )}
        </button>

        <p className="text-center text-[11px] leading-5 text-muted">
          By creating an account you agree to keep the community kind and your
          notes wonderfully organized.
        </p>
      </Form>
    </AuthShell>
  );
};

export default Signup;
