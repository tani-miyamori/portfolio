"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { LanguageProvider } from "@/components/language-provider";
import type { Language } from "@/lib/i18n";

/**
 * クライアント側プロバイダのまとめ。
 * - MotionConfig reducedMotion="user": prefers-reduced-motion を尊重し、
 *   ユーザーが動きを抑制している場合は Framer Motion のアニメーションを抑える。
 * - LanguageProvider: SSR で確定した initialLanguage を受け取る。
 */
export function Providers({
  children,
  initialLanguage,
}: {
  children: ReactNode;
  initialLanguage: Language;
}) {
  return (
    <MotionConfig reducedMotion="user">
      <LanguageProvider initialLanguage={initialLanguage}>
        {children}
      </LanguageProvider>
    </MotionConfig>
  );
}
