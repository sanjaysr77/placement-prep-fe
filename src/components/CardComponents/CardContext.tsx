import { createContext, useContext, type ReactNode } from "react";

type Subject = {
  image: string;
  title: string;
};

type CardContextType = {
  subjects: Subject[];
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
  subjects,
}: {
  children: ReactNode;
  subjects: Subject[];
}) => {
  return (
    <CardContext.Provider value={{ subjects }}>
      {children}
    </CardContext.Provider>
  );
};
