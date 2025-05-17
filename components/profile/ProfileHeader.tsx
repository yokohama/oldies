"use client";

import Image from "next/image";
import Link from "next/link";
import { UserProfileType } from "@/lib/types";
import { Edit, Globe, X, Instagram, Facebook, Youtube } from "lucide-react";
import { siteConfig } from "@/lib/config/siteConfig";
import { useProfileHeader } from "@/hooks/profile/useProfileHeader";

interface ProfileHeaderProps {
  user: UserProfileType;
}

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  const { profile, isOwnProfile, hasSocialLinks } = useProfileHeader({
    user: user,
  });

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
              profile.avatarUrl ||
              `https://api.dicebear.com/7.x/initials/svg?seed=${profile.id}`
            }
            alt={`${profile.name || "ユーザー"}のプロフィール | ${siteConfig.name}`}
            fill
            sizes="(max-width: 768px) 100vw, 96px"
            className="object-cover"
            unoptimized
            priority={true}
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl font-serif mb-2 text-[var(--oldies-accent-primary)]">
            {profile.name || "ユーザー"}
          </h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
            <span className="inline-block bg-[#e5dcc3] text-[#5c4d3c] text-xs px-3 py-1 rounded-full">
              ヴィンテージ愛好家
            </span>
            <span className="inline-block bg-[#e5dcc3] text-[#5c4d3c] text-xs px-3 py-1 rounded-full">
              鑑定ポイント投稿者
            </span>
          </div>

          {/* SNSリンク */}
          {hasSocialLinks && (
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-3">
              {profile.websiteUrl && (
                <a
                  href={profile.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5c4d3c] hover:text-[#a85751] transition-colors flex items-center gap-1"
                >
                  <Globe size={18} />
                  <span className="text-sm hidden sm:inline">ウェブサイト</span>
                </a>
              )}

              {profile.twitterUrl && (
                <a
                  href={profile.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5c4d3c] hover:text-[#a85751] transition-colors flex items-center gap-1"
                >
                  <X size={18} />
                  <span className="text-sm hidden sm:inline">Twitter</span>
                </a>
              )}

              {profile.instagramUrl && (
                <a
                  href={profile.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5c4d3c] hover:text-[#a85751] transition-colors flex items-center gap-1"
                >
                  <Instagram size={18} />
                  <span className="text-sm hidden sm:inline">Instagram</span>
                </a>
              )}

              {profile.facebookUrl && (
                <a
                  href={profile.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5c4d3c] hover:text-[#a85751] transition-colors flex items-center gap-1"
                >
                  <Facebook size={18} />
                  <span className="text-sm hidden sm:inline">Facebook</span>
                </a>
              )}

              {profile.youtubeUrl && (
                <a
                  href={profile.youtubeUrl}
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
