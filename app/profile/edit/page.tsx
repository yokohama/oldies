"use client";

import { Suspense } from "react";
import ProfileEditPage from "@/components/profile/ProfileEditPage";
import ProfileLoading from "@/components/profile/ProfileLoading";

export default function EditProfilePage() {
  return (
    <Suspense fallback={<ProfileLoading />}>
      <ProfileEditPage />
    </Suspense>
  );
}
