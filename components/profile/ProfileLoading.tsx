"use client";

import { Loader2 } from "lucide-react";

const ProfileLoading = () => {
  return (
    <div className="container mx-auto py-12 flex justify-center items-center min-h-[50vh]">
      <Loader2 className="h-8 w-8 animate-spin text-amber-700" />
    </div>
  );
};

export default ProfileLoading;
