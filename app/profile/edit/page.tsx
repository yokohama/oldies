"use client";

import { Suspense } from "react";
import ProfileEdit from "@/components/profile/ProfileEdit";
import Spinner from "@/components/ui/Spinner";

export default function ProfileEditPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <ProfileEdit />
    </Suspense>
  );
}
