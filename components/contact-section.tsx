"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { siteConfig } from "@/lib/site-config";

const socialLinks = [
  { icon: Github, label: "GitHub", href: siteConfig.social.github },
  { icon: Linkedin, label: "LinkedIn", href: siteConfig.social.linkedin },
  { icon: Twitter, label: "Twitter", href: siteConfig.social.twitter },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "submitting" | "success" | "error";

export function ContactSection() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState<string>("");

  const validate = (name: string, email: string, message: string) => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = t.contact.errorRequiredName;
    if (!email.trim()) next.email = t.contact.errorRequiredEmail;
    else if (!EMAIL_RE.test(email)) next.email = t.contact.errorInvalidEmail;
    if (!message.trim()) next.message = t.contact.errorRequiredMessage;
    return next;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    const data = new FormData(form);

    // ハニーポット（人間は空のまま）。値があればスパムとみなし、成功扱いで無視。
    if ((data.get("_gotcha") as string)?.trim()) {
      setStatus("success");
      form.reset();
      return;
    }

    const name = (data.get("name") as string) ?? "";
    const email = (data.get("email") as string) ?? "";
    const message = (data.get("message") as string) ?? "";

    const validationErrors = validate(name, email, message);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("idle");
      return;
    }
    setErrors({});

    if (!siteConfig.formspreeEndpoint) {
      setStatus("error");
      setErrorMessage(t.contact.notConfigured);
      return;
    }

    setStatus("submitting");
    setErrorMessage("");
    try {
      const res = await fetch(siteConfig.formspreeEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMessage(t.contact.errorBody);
      }
    } catch {
      setStatus("error");
      setErrorMessage(t.contact.errorBody);
    }
  };

  const isSubmitting = status === "submitting";

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4">
                {t.contact.label}
              </p>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight leading-tight">
                {t.contact.headingLine1} <br />
                <span className="text-muted-foreground">
                  {t.contact.headingLine2}
                </span>
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              {t.contact.description}
            </p>

            {/* Email link */}
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Mail size={20} />
              <span className="text-lg tracking-wide">{siteConfig.email}</span>
              <ArrowUpRight
                size={16}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </a>

            {/* Social links */}
            <div className="flex items-center gap-6 pt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right column - Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {status === "success" ? (
              <div
                role="status"
                className="flex flex-col items-start gap-3 border border-border p-8"
              >
                <CheckCircle2 className="text-foreground" size={28} />
                <h3 className="text-xl font-light tracking-tight">
                  {t.contact.successTitle}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t.contact.successBody}
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-2 text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {t.contact.send}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Honeypot (hidden from users) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="_gotcha">Leave this field empty</label>
                  <input
                    type="text"
                    id="_gotcha"
                    name="_gotcha"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <Field
                  id="name"
                  label={t.contact.nameLabel}
                  error={errors.name}
                >
                  <input
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-foreground focus:outline-none transition-colors"
                    placeholder={t.contact.namePlaceholder}
                  />
                </Field>

                <Field
                  id="email"
                  label={t.contact.emailLabel}
                  error={errors.email}
                >
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-foreground focus:outline-none transition-colors"
                    placeholder={t.contact.emailPlaceholder}
                  />
                </Field>

                <Field
                  id="message"
                  label={t.contact.messageLabel}
                  error={errors.message}
                >
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    aria-invalid={!!errors.message}
                    className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-foreground focus:outline-none transition-colors resize-none"
                    placeholder={t.contact.messagePlaceholder}
                  />
                </Field>

                {status === "error" && (
                  <p
                    role="alert"
                    className="flex items-center gap-2 text-destructive text-sm"
                  >
                    <AlertCircle size={16} />
                    {errorMessage || t.contact.errorBody}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-foreground text-background font-medium tracking-wide text-sm uppercase hover:bg-muted-foreground transition-colors mt-8 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {isSubmitting && (
                    <Loader2 size={16} className="animate-spin" />
                  )}
                  {isSubmitting ? t.contact.sending : t.contact.send}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm tracking-wide text-muted-foreground"
      >
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-destructive text-sm">
          {error}
        </p>
      )}
    </div>
  );
}
