import { CardStructure } from "../components/CardComponents/CardStructure";

export function Home() {
  const subjects = [
    { image: "/database.svg", title: "DBMS" },
    { image: "/OOPS.png", title: "OOPS" },
    { image: "/OS.jpeg", title: "OS" }
  ];

  return (
    <div className="p-8">
      <CardStructure subjects={subjects} />
    </div>
  );
}
