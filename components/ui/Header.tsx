import { ArrowDownWideNarrow } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="mb-6">
      <div className="flex items-center justify-between">
        <Link href="/brand">
          <h1 className="text-2xl font-medium text-stone-800 font-playfair border-b-2 border-amber-700 pb-1 cursor-pointer hover:text-amber-700 transition-colors">
            Oldies
          </h1>
        </Link>
        <ArrowDownWideNarrow className="h-5 w-5 text-amber-700" />
      </div>
    </header>
  );
};

export default Header;
