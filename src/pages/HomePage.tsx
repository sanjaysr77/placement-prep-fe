import { CardStructure } from "../components/CardComponents/CardStructure";
import { CardProvider } from "../components/CardComponents/CardContext";
import { useEffect, useMemo, useState } from "react";

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

  const [quizState, setQuizState] = useState<{ subject: string | null; questions: any[]; currentIndex: number; answers: Record<string, string>; submitted: boolean; loading: boolean; error: string | null }>({ subject: null, questions: [], currentIndex: 0, answers: {}, submitted: false, loading: false, error: null });

  useEffect(() => {
    function handleStart(e: Event) {
      const custom = e as CustomEvent;
      const subj = (custom.detail?.subject as string) || "";
      if (!subj) return;
      const normalized = subj.toLowerCase();
      const path = normalized === "dbms" ? "dbms" : normalized === "oops" ? "oops" : normalized === "os" ? "operating-systems" : "";
      if (!path) return;
      setQuizState((s) => ({ ...s, subject: subj, loading: true, submitted: false, error: null, currentIndex: 0, answers: {}, questions: [] }));
      fetch(`http://localhost:3000/v1/topicwise/${path}`, { headers: { "Content-Type": "application/json" } })
        .then(async (res) => {
          if (!res.ok) throw new Error("Failed to fetch questions");
          const data = await res.json();
          const list = Array.isArray(data)
            ? data
            : Object.entries(data).map(([instruction, q]: [string, any]) => ({ instruction, ...(q as any) }));
          setQuizState((s) => ({ ...s, questions: list, loading: false }));
        })
        .catch((err) => {
          setQuizState((s) => ({ ...s, loading: false, error: err.message || "Error fetching questions" }));
        });
    }
    window.addEventListener("start-quiz", handleStart as any);
    return () => window.removeEventListener("start-quiz", handleStart as any);
  }, []);

  const currentQuestion = useMemo(() => quizState.questions[quizState.currentIndex], [quizState.questions, quizState.currentIndex]);

  function handleSelect(option: string) {
    if (!currentQuestion?._id) return;
    setQuizState((s) => ({ ...s, answers: { ...s.answers, [currentQuestion._id]: option } }));
  }

  function goNext() {
    if (quizState.currentIndex < quizState.questions.length - 1) {
      setQuizState((s) => ({ ...s, currentIndex: s.currentIndex + 1 }));
    }
  }

  function goBack() {
    if (quizState.currentIndex > 0) {
      setQuizState((s) => ({ ...s, currentIndex: s.currentIndex - 1 }));
    }
  }

  function handleSubmit() {
    setQuizState((s) => ({ ...s, submitted: true }));
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
      <CardProvider subjects={subjects}>
        <CardStructure title="Subject Wise MCQ's" />
      </CardProvider>
      
      <CardProvider subjects={company}>
        <CardStructure title="Company Wise MCQ's" />
      </CardProvider>

      {quizState.subject && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/60 backdrop-blur overflow-y-auto"
          onClick={() => {
            if (quizState.submitted) {
              setQuizState({ subject: null, questions: [], currentIndex: 0, answers: {}, submitted: false, loading: false, error: null });
            }
          }}
        >
          <div
            className="w-full max-w-3xl bg-white/5 backdrop-blur border border-white/10 rounded-lg p-0 my-8 max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between sticky top-0 bg-white/5 backdrop-blur z-10">
              <div className="text-white font-semibold">{quizState.subject} Quiz</div>
              <button className="text-gray-300 hover:text-white cursor-pointer" onClick={() => setQuizState({ subject: null, questions: [], currentIndex: 0, answers: {}, submitted: false, loading: false, error: null })}>✕</button>
            </div>

            <div className="px-6 py-5 flex-1 overflow-y-auto">
              {quizState.loading && <div className="text-gray-200">Loading questions...</div>}
              {quizState.error && <div className="text-red-300">{quizState.error}</div>}

              {!quizState.loading && !quizState.error && quizState.questions.length > 0 && !quizState.submitted && (
                <div className="space-y-6">
                  <div className="text-gray-200 text-sm">Question {quizState.currentIndex + 1} of {quizState.questions.length}</div>
                  <div className="text-white text-lg font-medium">{currentQuestion?.question}</div>
                  <div className="grid gap-3">
                    {currentQuestion?.options?.map((opt: string) => {
                      const checked = quizState.answers[currentQuestion._id] === opt;
                      return (
                        <label key={opt} className={`flex items-center gap-3 p-3 rounded-md border ${checked ? "border-blue-500 bg-blue-500/10" : "border-white/10 bg-white/5"} text-white`}>
                          <input type="radio" name={`q-${currentQuestion._id}`} className="accent-blue-500" checked={checked} onChange={() => handleSelect(opt)} />
                          <span>{opt}</span>
                        </label>
                      )
                    })}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button className="px-4 py-2 rounded-md bg-gray-700 text-white disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed" disabled={quizState.currentIndex === 0} onClick={goBack}>Back</button>
                    {quizState.currentIndex < quizState.questions.length - 1 ? (
                      <button className="px-4 py-2 rounded-md bg-blue-600 text-white cursor-pointer" onClick={goNext}>Next</button>
                    ) : (
                      <button className="px-4 py-2 rounded-md bg-green-600 text-white cursor-pointer" onClick={handleSubmit}>Submit</button>
                    )}
                  </div>
                </div>
              )}

              {!quizState.loading && !quizState.error && quizState.submitted && (
                <div className="space-y-4 text-white">
                  <div className="text-xl font-semibold">Results</div>
                  <div className="space-y-3">
                    {quizState.questions.map((q) => {
                      const chosen = quizState.answers[q._id];
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
