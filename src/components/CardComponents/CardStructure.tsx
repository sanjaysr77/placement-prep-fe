import { Card2 } from "./Card2";
import { SmallCard } from "./SmallCard";
import { useCardContext } from "./CardContext";

type CardStructureProps = {
  title: string;
};

export function CardStructure({ title }: CardStructureProps) {
  const { subjects } = useCardContext();

  return (
    <div className="flex">
        <div className="bg-gray-300 m-6 p-6 rounded-lg w-full max-w-3xl">
          <h2 className="text-lg font-bold mb-4">{title}</h2>
        
          {/* Layout for small cards inside */}
          <div className="flex gap-4 flex-wrap">
            {subjects.map((subject, index) => (
              <SmallCard key={index} image={subject.image} title={subject.title} />
            ))}
          </div>
        </div>
        <Card2 />
    </div>
  );
}
