"use client";

import { ArrowDownWideNarrow } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import LoginButton from "@/components/auth/LoginButton";
import LogoutButton from "@/components/auth/LogoutButton";
import Image from "next/image";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  const handleAuthSuccess = () => {
    setOpen(false);
  };

  return (
    <header className="mb-8 pt-4 border-b border-amber-100">
      <div className="flex items-center justify-between pb-4">
        <Link href="/brand">
          <h1 className="text-3xl font-bold text-amber-800 font-playfair relative pb-1 cursor-pointer hover:text-amber-900 transition-colors group">
            <span className="italic tracking-wide">Oldies</span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
          </h1>
        </Link>
        <div className="flex items-center">
          <DropdownMenu.Root open={open} onOpenChange={setOpen}>
            <DropdownMenu.Trigger asChild>
              <button className="p-2 focus:outline-none relative">
                {user && user.user_metadata?.avatar_url ? (
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-200 shadow-sm hover:border-amber-300 transition-all duration-200">
                    <Image
                      src={user.user_metadata.avatar_url}
                      alt="プロフィール写真"
                      width={80}
                      height={80}
                      className="object-cover sepia-[0.15]"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-amber-50 border border-amber-200 hover:bg-amber-100 transition-colors">
                    <ArrowDownWideNarrow className="h-5 w-5 text-amber-700 cursor-pointer" />
                  </div>
                )}
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="min-w-[250px] w-[90vw] max-w-[320px] bg-[#f9f6f0] rounded-md p-3 shadow-md z-50 border border-amber-200"
                sideOffset={5}
                align="end"
              >
                {!user ? (
                  <DropdownMenu.Item className="px-4 py-3 text-base text-stone-800 hover:bg-amber-100 rounded cursor-pointer focus:outline-none">
                    <LoginButton onSuccess={handleAuthSuccess} />
                  </DropdownMenu.Item>
                ) : (
                  <>
                    <DropdownMenu.Item className="px-4 py-3 text-base text-stone-800 hover:bg-amber-100 rounded cursor-pointer focus:outline-none font-medium">
                      <Link
                        href="/profile"
                        className="flex w-full items-center"
                      >
                        マイページ
                      </Link>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="px-4 py-3 text-base text-stone-800 hover:bg-amber-100 rounded cursor-pointer focus:outline-none">
                      <LogoutButton onSuccess={handleAuthSuccess} />
                    </DropdownMenu.Item>
                  </>
                )}
                <DropdownMenu.Separator className="h-px bg-amber-200 my-2" />
                <DropdownMenu.Item className="px-4 py-2 text-sm text-stone-600 hover:bg-amber-100 rounded cursor-pointer focus:outline-none font-serif italic">
                  プライバシーポリシー
                </DropdownMenu.Item>
                <DropdownMenu.Item className="px-4 py-2 text-sm text-stone-600 hover:bg-amber-100 rounded cursor-pointer focus:outline-none font-serif italic">
                  利用規約
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>
    </header>
  );
};

export default Header;
