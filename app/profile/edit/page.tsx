"use client";

import { Suspense } from "react";
import ProfileEditPage from "@/components/profile/ProfileEditPage";
import Spinner from "@/components/ui/Spinner";

export default function EditProfilePage() {
  return (
    <Suspense fallback={<Spinner />}>
      <ProfileEditPage />
    </Suspense>
  );
}
