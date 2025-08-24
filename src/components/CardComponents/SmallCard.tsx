type SmallCardProps = {
  image: string;
  title: string;
  onClick?: (title: string) => void;
};

export function SmallCard({ image, title, onClick }: SmallCardProps) {
  return (
    <div className="bg-white shadow-md rounded-md p-2 sm:p-3 lg:p-4 w-full aspect-square flex flex-col items-center justify-center
        transition duration-200 ease-in-out
        hover:bg-gray-200 active:scale-95
        cursor-pointer"
          onClick={() => onClick?.(title)}>
      <img src={image} alt={title} className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 mb-1 sm:mb-2" />
      <span className="text-xs sm:text-sm lg:text-base font-medium text-black text-center leading-tight">{title}</span>
    </div>
  );
}
