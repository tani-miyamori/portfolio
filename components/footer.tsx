export function Footer() {
  return (
    <footer className="py-16 md:py-24 px-6 md:px-12 lg:px-24 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 md:gap-16 mb-16">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 border border-foreground flex items-center justify-center">
                <span className="text-xs font-light">歴</span>
              </div>
              <span className="text-sm tracking-[0.2em]">歴史館</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              千年の時を超えて受け継がれる日本の美と文化。
              私たちは、その深淵なる世界への扉を開きます。
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm tracking-wider mb-6">ご案内</h4>
            <nav className="flex flex-col gap-3">
              <a href="#about" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                館について
              </a>
              <a href="#exhibitions" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                展示
              </a>
              <a href="#collection" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                所蔵品
              </a>
              <a href="#visit" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                ご来館
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm tracking-wider mb-6">お問い合わせ</h4>
            <div className="space-y-3 text-muted-foreground text-sm">
              <p>03-1234-5678</p>
              <p>info@rekishikan.jp</p>
            </div>
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="X">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs tracking-wider">
            © 2024 歴史館. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-muted-foreground text-xs">
            <a href="#" className="hover:text-foreground transition-colors">プライバシーポリシー</a>
            <a href="#" className="hover:text-foreground transition-colors">利用規約</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
