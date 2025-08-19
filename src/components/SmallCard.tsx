import { useCardContext } from "./CardContext";

export function SmallCard() {
  const { cardData } = useCardContext();

  return (
    <div className="flex flex-col items-center p-2 border border-black w-50 bg-gray-400 rounded-lg">
      <img src={cardData.image} alt={cardData.title} className="w-16 h-16" />
      <p className="text-lg font-semibold">{cardData.title}</p>
    </div>
  );
}
