import { Card2 } from "./Card2";
import { SmallCard } from "./SmallCard";
import { useCardContext } from "./CardContext";
import { useState } from "react";

type CardStructureProps = {
  title: string;
  onStartQuiz?: (subject: string) => void; // ✅ new prop
};

export function CardStructure({ title, onStartQuiz }: CardStructureProps) {
  const { subjects } = useCardContext();
  const [selectedSubjects, setSelectedSubjects] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  function handleCardClick(title: string) {
    setSelectedSubjects(title);
    setShowModal(true);
  }

  function handleStart() {
    if (selectedSubjects && onStartQuiz) {
      onStartQuiz(selectedSubjects); // ✅ Call parent instead of dispatching event
    }
    setShowModal(false);
  }

  return (
    <div className="flex gap-3 sm:gap-4 lg:gap-6 w-full items-stretch">
      <div className="bg-gray-300 p-3 sm:p-4 lg:p-6 rounded-lg flex-[3] min-w-0">
        <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold mb-3 sm:mb-4 lg:mb-6">
          {title}
        </h2>

        {/* Responsive grid layout for small cards */}
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
          {subjects.map((subject, index) => (
            <SmallCard
              key={index}
              image={subject.image}
              title={subject.title}
              onClick={handleCardClick}
            />
          ))}
        </div>
      </div>
      <Card2 />
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedSubjects} Instructions
              </h3>
              <button
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="px-6 py-5 text-red-800 space-y-4">
              <p>
                You will be asked 10 MCQs. Select one option and move
                forward/backward. At the end, you’ll see your score.
              </p>
            </div>
            <div className="px-6 py-4 border-t flex items-center justify-end gap-3">
              <button
                className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 cursor-pointer"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                onClick={handleStart} // ✅ React way
              >
                Start
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
