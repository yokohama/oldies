interface PageTitleProps {
  title: string;
}

const PageTitle = ({ title }: PageTitleProps) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-serif text-[#5c4d3c] mb-2">{title}</h1>
      <div className="w-24 h-1 bg-[#d3c7a7] mx-auto"></div>
    </div>
  );
};

export default PageTitle;
