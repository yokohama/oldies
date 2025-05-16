"use client";

import Image from "next/image";
import Link from "next/link";
import { UserProfile } from "@/lib/types";
import { useAuth } from "@/contexts/AuthContext";
import {
  Edit,
  Globe,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";
import { siteConfig } from "@/lib/config/siteConfig";

interface ProfileHeaderProps {
  user: UserProfile;
}

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  const { user: currentUser } = useAuth();
  const isOwnProfile = currentUser && currentUser.id === user.id;

  // SNSリンクがあるかどうかを確認
  const hasSocialLinks =
    user.websiteUrl ||
    user.twitterUrl ||
    user.instagramUrl ||
    user.facebookUrl ||
    user.youtubeUrl;

  return (
    <div className="bg-[#f8f3e6] border border-[#d3c7a7] rounded-md p-6 mb-8 relative">
      {isOwnProfile && (
        <Link
          href="/profile/edit"
          className="absolute top-4 right-4 bg-[#e5dcc3] hover:bg-[#d3c7a7] text-[#5c4d3c] p-2 rounded-md transition-colors flex items-center gap-1"
        >
          <Edit size={16} />
          <span className="text-sm">編集</span>
        </Link>
      )}

      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-[#d3c7a7]">
          <Image
            src={
              user.avatarUrl ||
              `https://api.dicebear.com/7.x/initials/svg?seed=${user.id}`
            }
            alt={`${user.name || "ユーザー"}のプロフィール | ${siteConfig.name}`}
            fill
            className="object-cover"
            unoptimized
            priority={true}
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl font-serif text-[#5c4d3c] mb-2">
            {user.name || "ユーザー"}
          </h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
            <span className="inline-block bg-[#e5dcc3] text-[#5c4d3c] text-xs px-3 py-1 rounded-full">
              ヴィンテージ愛好家
            </span>
            <span className="inline-block bg-[#e5dcc3] text-[#5c4d3c] text-xs px-3 py-1 rounded-full">
              チェックポイント投稿者
            </span>
          </div>

          {/* SNSリンク */}
          {hasSocialLinks && (
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-3">
              {user.websiteUrl && (
                <a
                  href={user.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5c4d3c] hover:text-[#a85751] transition-colors flex items-center gap-1"
                >
                  <Globe size={18} />
                  <span className="text-sm hidden sm:inline">ウェブサイト</span>
                </a>
              )}

              {user.twitterUrl && (
                <a
                  href={user.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5c4d3c] hover:text-[#a85751] transition-colors flex items-center gap-1"
                >
                  <Twitter size={18} />
                  <span className="text-sm hidden sm:inline">Twitter</span>
                </a>
              )}

              {user.instagramUrl && (
                <a
                  href={user.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5c4d3c] hover:text-[#a85751] transition-colors flex items-center gap-1"
                >
                  <Instagram size={18} />
                  <span className="text-sm hidden sm:inline">Instagram</span>
                </a>
              )}

              {user.facebookUrl && (
                <a
                  href={user.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5c4d3c] hover:text-[#a85751] transition-colors flex items-center gap-1"
                >
                  <Facebook size={18} />
                  <span className="text-sm hidden sm:inline">Facebook</span>
                </a>
              )}

              {user.youtubeUrl && (
                <a
                  href={user.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5c4d3c] hover:text-[#a85751] transition-colors flex items-center gap-1"
                >
                  <Youtube size={18} />
                  <span className="text-sm hidden sm:inline">YouTube</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
