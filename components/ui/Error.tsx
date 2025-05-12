"use client";

import Link from "next/link";

interface ErrorProps {
  returnUrl?: string;
  label?: string;
}

const Error = ({ returnUrl = "/", label = "TOP" }: ErrorProps) => {
  return (
    <div className="text-center py-10 border-2 border-dashed border-[#d3c7a7] rounded-md">
      <p className="text-lg text-[#7a6b59] italic">
        エラーが発生しました。再度お試しください。
      </p>
      <Link
        href={returnUrl}
        className="mt-4 inline-block text-[#5c4d3c] hover:text-[#7a6b59] border-b border-[#d3c7a7] font-serif"
      >
        {label}
      </Link>
    </div>
  );
};

export default Error;
