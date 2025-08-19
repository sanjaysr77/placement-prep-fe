import { CardProvider } from "../components/CardContext";
import { CardStructure } from "../components/CardStructure";

export function Home() {
  const cardInfo = {
    image: "/database.svg", // example path
    title: "DBMS"
  };
  const cardInfo2 = {
    image: "/database.svg", // example path
    title: "OOPS"
  };
  const cardInfo3 = {
    image: "/database.svg", // example path
    title: "OS"
  };

  return (
    <CardProvider cardData={cardInfo}>
      <CardStructure />
    </CardProvider>
  );
}
