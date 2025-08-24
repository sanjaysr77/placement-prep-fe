import { CardStructure } from "../components/CardComponents/CardStructure";
import { CardProvider } from "../components/CardComponents/CardContext";
import { useMemo, useState } from "react";

export function Home() {
  const subjects = [
    { image: "/database.svg", title: "DBMS" },
    { image: "/OOPS.png", title: "OOPS" },
    { image: "/OS.jpeg", title: "OS" }
  ];

  const company = [
    { image: "/infosys.png", title: "Infosys" },
    { image: "/wipro.png", title: "Wipro" },
    { image: "/TCS.png", title: "TCS" }
  ];

  const [subject, setSubject] = useState<string | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function startQuiz(subj: string) {
    const normalized = subj.toLowerCase();
    const path =
      normalized === "dbms" ? "dbms" :
      normalized === "oops" ? "oops" :
      normalized === "os" ? "operating-systems" : "";

    if (!path) return;

    setSubject(subj);
    setLoading(true);
    setSubmitted(false);
    setError(null);
    setCurrentIndex(0);
    setAnswers({});
    setQuestions([]);

    try {
      const res = await fetch(`http://localhost:3000/v1/topicwise/${path}`, {
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Failed to fetch questions");
      const data = await res.json();
      const list = Array.isArray(data)
        ? data
        : Object.entries(data).map(([instruction, q]: [string, any]) => ({
            instruction,
            ...(q as any),
          }));
      setQuestions(list);
    } catch (err: any) {
      setError(err.message || "Error fetching questions");
    } finally {
      setLoading(false);
    }
  }

  const currentQuestion = useMemo(
    () => questions[currentIndex],
    [questions, currentIndex]
  );

  function handleSelect(option: string) {
    if (!currentQuestion?._id) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion._id]: option }));
  }

  function goNext() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }

  function goBack() {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  function resetQuiz() {
    setSubject(null);
    setQuestions([]);
    setCurrentIndex(0);
    setAnswers({});
    setSubmitted(false);
    setLoading(false);
    setError(null);
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
      <CardProvider subjects={subjects}>
        <CardStructure title="Subject Wise MCQ's" onStartQuiz={startQuiz} />
      </CardProvider>

      <CardProvider subjects={company}>
        <CardStructure title="Company Wise MCQ's" onStartQuiz={startQuiz} />
      </CardProvider>

      {subject && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/60 backdrop-blur overflow-y-auto"
          onClick={() => {
            if (submitted) resetQuiz();
          }}
        >
          <div
            className="w-full max-w-3xl bg-white/5 backdrop-blur border border-white/10 rounded-lg p-0 my-8 max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between sticky top-0 bg-white/5 backdrop-blur z-10">
              <div className="text-white font-semibold">{subject} Quiz</div>
              <button className="text-gray-300 hover:text-white cursor-pointer" onClick={resetQuiz}>✕</button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 flex-1 overflow-y-auto">
              {loading && <div className="text-gray-200">Loading questions...</div>}
              {error && <div className="text-red-300">{error}</div>}

              {!loading && !error && questions.length > 0 && !submitted && (
                <div className="space-y-6">
                  <div className="text-gray-200 text-sm">Question {currentIndex + 1} of {questions.length}</div>
                  <div className="text-white text-lg font-medium">{currentQuestion?.question}</div>
                  <div className="grid gap-3">
                    {currentQuestion?.options?.map((opt: string) => {
                      const checked = answers[currentQuestion._id] === opt;
                      return (
                        <label key={opt} className={`flex items-center gap-3 p-3 rounded-md border ${checked ? "border-blue-500 bg-blue-500/10" : "border-white/10 bg-white/5"} text-white`}>
                          <input
                            type="radio"
                            name={`q-${currentQuestion._id}`}
                            className="accent-blue-500"
                            checked={checked}
                            onChange={() => handleSelect(opt)}
                          />
                          <span>{opt}</span>
                        </label>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button className="px-4 py-2 rounded-md bg-gray-700 text-white disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed" disabled={currentIndex === 0} onClick={goBack}>Back</button>
                    {currentIndex < questions.length - 1 ? (
                      <button className="px-4 py-2 rounded-md bg-blue-600 text-white cursor-pointer" onClick={goNext}>Next</button>
                    ) : (
                      <button className="px-4 py-2 rounded-md bg-green-600 text-white cursor-pointer" onClick={handleSubmit}>Submit</button>
                    )}
                  </div>
                </div>
              )}

              {!loading && !error && submitted && (
                <div className="space-y-4 text-white">
                  <div className="text-xl font-semibold">Results</div>
                  <div className="space-y-3">
                    {questions.map((q) => {
                      const chosen = answers[q._id];
                      const isCorrect = q.correctAnswer ? q.correctAnswer === chosen : undefined;
                      return (
                        <div key={q._id} className="p-3 rounded-md border border-white/10 bg-white/5">
                          <div className="font-medium mb-2">{q.question}</div>
                          <div className="text-sm">Your answer: <span className="font-semibold">{chosen ?? "—"}</span></div>
                          {q.correctAnswer && (
                            <div className="text-sm">Correct answer: <span className="font-semibold">{q.correctAnswer}</span> {isCorrect !== undefined && (<span className={isCorrect ? "text-green-400" : "text-red-400"}>({isCorrect ? "Correct" : "Wrong"})</span>)}</div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
