type SmallCardProps = {
  image: string;
  title: string;
};

export function SmallCard({ image, title }: SmallCardProps) {
  return (
    <div className="bg-white shadow-md rounded-md p-4 w-28 h-28 flex flex-col items-center justify-center">
      <img src={image} alt={title} className="w-10 h-10 mb-2" />
      <span className="text-sm font-medium text-black">{title}</span>
    </div>
  );
}
