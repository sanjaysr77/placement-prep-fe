import { createContext, useContext, type ReactNode } from "react";

type Subject = {
  image: string;
  title: string;
};

type CardContextType = {
  subjects: Subject[];
};

const CardContext = createContext<CardContextType | undefined>(undefined); // Data type is array of Subject // Default value is undefined

export const useCardContext = () => {
  const context = useContext(CardContext);
  console.log("Context", context)
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

// This code defines a React context system for sharing an array of subjects across components without passing props manually. It first defines types: Subject for individual items and CardContextType for the context shape. Then, it creates CardContext using createContext, with a default value of undefined—this default is returned only if a component tries to access the context outside of a provider.

//The CardProvider component wraps its children with <CardContext.Provider> and provides the actual subjects array as its value. When a child component calls the custom hook useCardContext(), the line useContext(CardContext) looks upward in the component tree for the nearest CardContext.Provider, finds it, and retrieves the subjects array from its value. The hook also includes a safeguard: if no provider exists above it in the tree, it throws a clear error to prevent undefined access. This setup ensures that components can reliably access subjects anywhere in the tree while avoiding prop drilling and runtime errors.
