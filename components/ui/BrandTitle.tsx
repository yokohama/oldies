interface BrandTitleProps {
  brandName: string | undefined;
}

const BrandTitle = ({ brandName }: BrandTitleProps) => {
  return (
    <header className="mb-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium text-stone-600 font-playfair pb-1">
          {brandName}
        </h1>
      </div>
    </header>
  );
};

export default BrandTitle;
