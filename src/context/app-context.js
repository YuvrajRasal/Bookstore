import { createContext, useContext, useState } from "react";

const defaultProviderValues = {};

const AppContext = createContext(defaultProviderValues);

export const AppProvider = ({ children }) => {
  //   const [currentUser, setCurrentUser] = useState("");
  const [cardData, SetCardData] = useState([]);
  const [openView, setOpenView] = useState(false);
  return (
    <AppContext.Provider
      value={{
        cardData,
        SetCardData,
        openView,
        setOpenView,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
