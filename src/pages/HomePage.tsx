import { CardStructure } from "../components/CardComponents/CardStructure";
import { CardProvider } from "../components/CardComponents/CardContext";

export function Home() {
  const subjects = [
    { image: "/database.svg", title: "DBMS" },
    { image: "/OOPS.png", title: "OOPS" },
    { image: "/OS.jpeg", title: "OS" }
  ];

  const company = [
    { image: "/Infosys.png", title: "Infosys" },
    { image: "/wipro.png", title: "Wipro" },
    { image: "/TCS.png", title: "TCS" }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
      <CardProvider subjects={subjects}>
        <CardStructure title="Subject Wise MCQ's" />
      </CardProvider>
      
      <CardProvider subjects={company}>
        <CardStructure title="Company Wise MCQ's" />
      </CardProvider>
    </div>
  );
}
