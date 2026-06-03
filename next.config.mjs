/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // 掲載スクリーンショットのプレースホルダに SVG を使うため許可する。
    // 自前配置の画像のみを対象とし、外部 SVG は読み込まない。
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
