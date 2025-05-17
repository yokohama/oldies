import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useProfileContext } from "@/contexts/ProfileContext";
import { UserProfile } from "@/lib/types";

interface useProfileHeaderProps {
  user: UserProfile;
}

export const useProfileHeader = ({ user }: useProfileHeaderProps) => {
  const [profile, setProfile] = useState<UserProfile>(user);
  const { user: currentUser } = useAuth();
  const { updatedProfile } = useProfileContext();
  const isOwnProfile = currentUser && currentUser.id === profile.id;

  // 初期プロフィールの設定
  useEffect(() => {
    setProfile(user);
  }, [user]);

  // プロフィールが更新された場合に反映
  useEffect(() => {
    if (updatedProfile && updatedProfile.id === profile.id) {
      setProfile(updatedProfile);
    }
  }, [updatedProfile, profile.id]);

  // SNSリンクがあるかどうかを確認
  const hasSocialLinks =
    profile.websiteUrl ||
    profile.twitterUrl ||
    profile.instagramUrl ||
    profile.facebookUrl ||
    profile.youtubeUrl;

  return {
    profile,
    isOwnProfile,
    hasSocialLinks,
  };
};
