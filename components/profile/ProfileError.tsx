"use client";

interface ProfileErrorProps {
  error: string | null;
}

const ProfileError = ({ error }: ProfileErrorProps) => {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-2xl mx-auto bg-[#f8f3e6] border border-[#d3c7a7] rounded-md p-6 text-center">
        <h1 className="text-xl font-serif text-[#5c4d3c] mb-4">
          {error || "ユーザーが見つかりません"}
        </h1>
        <p className="text-sm text-[#7a6b59]">
          お探しのユーザープロフィールは存在しないか、アクセスできません。
        </p>
      </div>
    </div>
  );
};

export default ProfileError;
