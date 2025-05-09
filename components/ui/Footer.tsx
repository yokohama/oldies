"use client";

import Link from "next/link";
import { Instagram, Twitter, Facebook, Mail, Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Footer = () => {
  const { user } = useAuth();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-amber-100 pt-8 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* ブランド情報 */}
          <div className="space-y-4">
            <Link href="/brand">
              <h2 className="text-2xl font-bold text-amber-800 font-playfair relative pb-1 cursor-pointer hover:text-amber-900 transition-colors group inline-block">
                <span className="italic tracking-wide">Oldies</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
              </h2>
            </Link>
            <p className="text-sm text-stone-600 leading-relaxed">
              ビンテージアパレルの魅力を再発見するプラットフォーム。
              時代を超えて愛されるアイテムの歴史と価値を共有します。
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-amber-700 hover:text-amber-900 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-amber-700 hover:text-amber-900 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-amber-700 hover:text-amber-900 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="mailto:contact@oldies.example.com"
                className="text-amber-700 hover:text-amber-900 transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* ナビゲーション */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-amber-800 border-b border-amber-100 pb-2">
              サイトマップ
            </h3>
            <nav className="grid grid-cols-2 gap-2">
              <Link
                href="/brand"
                className="text-stone-600 hover:text-amber-800 transition-colors text-sm py-1"
              >
                ブランド一覧
              </Link>
              <Link
                href="/about"
                className="text-stone-600 hover:text-amber-800 transition-colors text-sm py-1"
              >
                Oldiesについて
              </Link>
              <Link
                href="/blog"
                className="text-stone-600 hover:text-amber-800 transition-colors text-sm py-1"
              >
                ブログ
              </Link>
              {user && (
                <Link
                  href="/profile"
                  className="text-stone-600 hover:text-amber-800 transition-colors text-sm py-1"
                >
                  マイページ
                </Link>
              )}
              <Link
                href="/contact"
                className="text-stone-600 hover:text-amber-800 transition-colors text-sm py-1"
              >
                お問い合わせ
              </Link>
              <Link
                href="/faq"
                className="text-stone-600 hover:text-amber-800 transition-colors text-sm py-1"
              >
                よくある質問
              </Link>
            </nav>
          </div>

          {/* 法的情報 */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-amber-800 border-b border-amber-100 pb-2">
              法的情報
            </h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/privacy"
                className="text-stone-600 hover:text-amber-800 transition-colors text-sm"
              >
                プライバシーポリシー
              </Link>
              <Link
                href="/terms"
                className="text-stone-600 hover:text-amber-800 transition-colors text-sm"
              >
                利用規約
              </Link>
              <Link
                href="/cookies"
                className="text-stone-600 hover:text-amber-800 transition-colors text-sm"
              >
                Cookieポリシー
              </Link>
            </nav>
          </div>
        </div>

        {/* コピーライト */}
        <div className="mt-8 pt-4 border-t border-amber-100 text-center">
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
