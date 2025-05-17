"use client";

import Link from "next/link";
import { Instagram, X, Facebook, Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { siteConfig } from "@/lib/config/siteConfig";

const Footer = () => {
  const { user } = useAuth();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-amber-100 pt-6 pb-4">
      <div className="container mx-auto px-4">
        {/* ブランド情報とソーシャルリンク */}
        <div className="flex flex-col items-center text-center mb-6">
          <Link href="/brands">
            <h2 className="text-2xl font-bold text-amber-800 font-playfair relative pb-1 cursor-pointer hover:text-amber-900 transition-colors group inline-block">
              <span className="italic tracking-wide">Oldies</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
            </h2>
          </Link>
          <p className="text-sm text-stone-600 leading-relaxed max-w-md mt-3 mb-4">
            {siteConfig.description}
          </p>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-amber-700 hover:text-amber-900 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="text-amber-700 hover:text-amber-900 transition-colors"
              aria-label="Twitter"
            >
              <X size={20} />
            </a>
            <a
              href="#"
              className="text-amber-700 hover:text-amber-900 transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
          </div>
        </div>

        {/* ナビゲーションリンク */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-2 max-w-2xl mx-auto mb-8">
          <Link
            href="/brands"
            className="text-stone-600 hover:text-amber-800 transition-colors text-sm text-center"
          >
            ブランド一覧
          </Link>
          {user && (
            <Link
              href="/profile"
              className="text-stone-600 hover:text-amber-800 transition-colors text-sm text-center"
            >
              マイページ
            </Link>
          )}
          <Link
            href="/contact"
            className="text-stone-600 hover:text-amber-800 transition-colors text-sm text-center"
          >
            お問い合わせ
          </Link>
          <Link
            href="/faq"
            className="text-stone-600 hover:text-amber-800 transition-colors text-sm text-center"
          >
            よくある質問
          </Link>
          <Link
            href="/privacy"
            className="text-stone-600 hover:text-amber-800 transition-colors text-sm text-center"
          >
            プライバシー
          </Link>
          <Link
            href="/terms"
            className="text-stone-600 hover:text-amber-800 transition-colors text-sm text-center"
          >
            利用規約
          </Link>
        </div>

        {/* コピーライト */}
        <div className="pt-4 border-t border-amber-100 text-center">
          <p className="text-xs text-stone-500 flex items-center justify-center">
            © {currentYear} Oldies. Made with{" "}
            <Heart size={12} className="mx-1 text-amber-700" /> in Japan
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
