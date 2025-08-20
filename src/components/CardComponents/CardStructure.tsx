import { Card2 } from "./Card2";
import { SmallCard } from "./SmallCard";
import { useCardContext } from "./CardContext";

type CardStructureProps = {
  title: string;
};

export function CardStructure({ title }: CardStructureProps) {
  const { subjects } = useCardContext();

  return (
    <div className="flex gap-3 sm:gap-4 lg:gap-6 w-full items-stretch">
      <div className="bg-gray-300 p-3 sm:p-4 lg:p-6 rounded-lg flex-[3] min-w-0">
        <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold mb-3 sm:mb-4 lg:mb-6">{title}</h2>
      
        {/* Responsive grid layout for small cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
          {subjects.map((subject, index) => (
            <SmallCard key={index} image={subject.image} title={subject.title} />
          ))}
        </div>
      </div>
      <Card2 />
    </div>
  );
}
