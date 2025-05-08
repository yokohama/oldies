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
    <header className="mb-6">
      <div className="flex items-center justify-between">
        <Link href="/brand">
          <h1 className="text-2xl font-medium text-stone-800 font-playfair border-b-2 border-amber-700 pb-1 cursor-pointer hover:text-amber-700 transition-colors">
            Oldies
          </h1>
        </Link>
        <div className="flex items-center">
          <DropdownMenu.Root open={open} onOpenChange={setOpen}>
            <DropdownMenu.Trigger asChild>
              <button className="p-2 focus:outline-none">
                {user && user.user_metadata?.avatar_url ? (
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-amber-200">
                    <Image
                      src={user.user_metadata.avatar_url}
                      alt="プロフィール写真"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <ArrowDownWideNarrow className="h-6 w-6 text-amber-700 cursor-pointer hover:text-amber-800 transition-colors" />
                )}
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="min-w-[250px] w-[90vw] max-w-[320px] bg-white rounded-lg p-3 shadow-lg z-50 border border-stone-200"
                sideOffset={5}
                align="end"
              >
                {!user ? (
                  <DropdownMenu.Item className="px-3 py-3 text-base text-stone-700 hover:bg-amber-50 rounded cursor-pointer focus:outline-none">
                    <LoginButton onSuccess={handleAuthSuccess} />
                  </DropdownMenu.Item>
                ) : (
                  <>
                    <DropdownMenu.Item className="px-3 py-3 text-base text-stone-700 hover:bg-amber-50 rounded cursor-pointer focus:outline-none">
                      <Link
                        href="/profile"
                        className="flex w-full items-center"
                      >
                        マイページ
                      </Link>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="px-3 py-3 text-base text-stone-700 hover:bg-amber-50 rounded cursor-pointer focus:outline-none">
                      <LogoutButton onSuccess={handleAuthSuccess} />
                    </DropdownMenu.Item>
                  </>
                )}
                <DropdownMenu.Separator className="h-px bg-stone-200 my-2" />
                <DropdownMenu.Item className="px-3 py-2 text-sm text-stone-700 hover:bg-amber-50 rounded cursor-pointer focus:outline-none">
                  プライバシーポリシー
                </DropdownMenu.Item>
                <DropdownMenu.Item className="px-3 py-2 text-sm text-stone-700 hover:bg-amber-50 rounded cursor-pointer focus:outline-none">
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
