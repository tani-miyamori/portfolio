"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Github, Linkedin, Twitter } from "lucide-react";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
];

export function ContactSection() {
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
                Get in Touch
              </p>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight leading-tight">
                {"Let's Work"} <br />
                <span className="text-muted-foreground">Together</span>
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Have a project in mind or just want to say hello? {"I'm"} always open
              to discussing new opportunities and creative ideas.
            </p>

            {/* Email link */}
            <a
              href="mailto:hello@example.com"
              className="inline-flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors group"
            >
              <Mail size={20} />
              <span className="text-lg tracking-wide">hello@example.com</span>
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
                  className="text-muted-foreground hover:text-foreground transition-colors"
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
            <form className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm tracking-wide text-muted-foreground"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-foreground focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm tracking-wide text-muted-foreground"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-foreground focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="block text-sm tracking-wide text-muted-foreground"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-foreground focus:outline-none transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-foreground text-background font-medium tracking-wide text-sm uppercase hover:bg-muted-foreground transition-colors mt-8"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
