import { ArrowDownWideNarrow } from 'lucide-react';

const Header = () => {
  return (
    <header className="mb-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium text-stone-800 font-playfair border-b-2 border-amber-700 pb-1">
          Champion <span className="text-xl tracking-wide font-normal">リバースウィーブ</span>
        </h1>
        <ArrowDownWideNarrow className="h-5 w-5 text-amber-700" />
      </div>
      <p className="mt-3 text-sm text-stone-600">
        ビンテージを探索する
      </p>
    </header>
  );
};

export default Header;