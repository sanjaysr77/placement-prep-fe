import { createContext, useContext, ReactNode } from "react";

type CardData = {
  image: string;
  title: string;
};

type CardContextType = {
  cardData: CardData;
};

const CardContext = createContext<CardContextType | undefined>(undefined);

export const useCardContext = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("useCardContext must be used inside CardProvider");
  }
  return context;
};

export const CardProvider = ({
  children,
  cardData,
}: {
  children: ReactNode;
  cardData: CardData;
}) => {
  return (
    <CardContext.Provider value={{ cardData }}>
      {children}
    </CardContext.Provider>
  );
};
