import { SmallCard } from "./SmallCard";

export function Card() {
  return (
    <div className="flex gap-6
      bg-gray-300 m-15 w-56 h-30 p-4 rounded-lg 
      sm:w-80 sm:h-40 sm:p-6 
      md:w-125 md:h-40 md:p-6 
      lg:w-200 lg:h-48 lg:p-8">   
      <SmallCard />
    </div>
  );
}
