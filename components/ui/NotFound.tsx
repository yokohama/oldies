"use client";

interface NotFoundProps {
  text?: string;
}

const NotFound = ({
  text = "アイテムが見つかりませんでした。",
}: NotFoundProps) => {
  return (
    <div className="text-center py-10 border-2 border-dashed border-[#d3c7a7] rounded-md">
      <p className="text-lg text-[#7a6b59] italic">{text}</p>
    </div>
  );
};

export default NotFound;
