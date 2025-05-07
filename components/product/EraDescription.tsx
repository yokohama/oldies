"use client";

interface EraDescriptionProps {
  era: number;
  rangeValue: number[];
}

const eraDescriptions: Record<number, string> = {
  50: "1950年代のチャンピオンアイテムは希少価値が高い。第二次世界大戦後、スポーツウェアとして確立し始めた時期で、シンプルなデザインと頑丈な作りが特徴。",
  60: "1960年代はカレッジスポーツの人気と共にチャンピオンも成長。学生運動の時代背景もあり、キャンパスではチャンピオンのスウェットが定番に。",
  70: "1970年代はリバースウィーブが技術的に完成した時代。横編みの特殊技術により、縮みを防ぐ画期的な製法が確立。特に中期から後期のアイテムは色あせた風合いが魅力。",
  80: "1980年代は多様な色展開が特徴。スポーツチームやカレッジのライセンス製品が多数生産され、トリコタグからブルータグへの移行期でもある。",
  90: "1990年代はストリートファッションとの融合が進んだ時期。ヒップホップカルチャーの影響もあり、よりカジュアルな着こなしが定着。現在のヴィンテージブームの中心的存在。",
};

const EraDescription = ({ era, rangeValue }: EraDescriptionProps) => {
  return (
    <div className="mb-6 border border-stone-200 rounded-lg p-4 bg-white">
      <h2 className="text-lg font-medium text-stone-800 mb-2 font-playfair">
        {1900 + era}の特徴
      </h2>
      <p className="text-sm text-stone-600 leading-relaxed">
        {eraDescriptions[era] || "選択した年代の説明はありません。"}
      </p>
    </div>
  );
};

export default EraDescription;
