import { Form, Link, useActionData, useNavigation } from "react-router-dom";
import { ArrowLeft, ArrowRight, Loader2, Mail, Lock } from "lucide-react";
import AuthShell from "../Components/AuthShell";

const Forgot = () => {
  const actionData = useActionData();
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";

  return (
    <AuthShell
      title="Reset your password"
      subtitle="Enter your email and choose a new password. It only takes a minute."
      panelTitle="Forgot the password. Not the ideas."
      panelText="Reset access and get straight back to the notes that matter. Your workspace will be waiting."
      footer={
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 font-semibold text-brand-700 hover:text-brand-800"
        >
          <ArrowLeft className="size-3.5" />
          Back to login
        </Link>
      }
    >
      <Form method="post" className="space-y-4">
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
          <label htmlFor="new_password" className="label">
            New password
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              id="new_password"
              type="password"
              name="new_password"
              autoComplete="new-password"
              required
              minLength={8}
              placeholder="At least 8 characters"
              className="input pl-10"
            />
          </div>
        </div>

        <div>
          <label htmlFor="confirm_password" className="label">
            Confirm new password
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              id="confirm_password"
              type="password"
              name="confirm_password"
              autoComplete="new-password"
              required
              minLength={8}
              placeholder="Repeat your new password"
              className="input pl-10"
            />
          </div>
        </div>

        <div className="rounded-xl bg-brand-50 px-4 py-3 text-xs leading-5 text-brand-800">
          For your security, use a password you don't reuse on other sites.
        </div>

        <button type="submit" disabled={submitting} className="btn-primary w-full py-3">
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Resetting password…
            </>
          ) : (
            <>
              Reset password
              <ArrowRight className="size-4" />
            </>
          )}
        </button>
      </Form>
    </AuthShell>
  );
};

export default Forgot;
