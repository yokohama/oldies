"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";
import ProfilePage from "@/components/profile/ProfilePage";
import ProfileLoading from "@/components/profile/ProfileLoading";

export default function UserProfilePage() {
  const { id } = useParams();

  return (
    <Suspense fallback={<ProfileLoading />}>
      <ProfilePage userId={id as string} />
    </Suspense>
  );
}
