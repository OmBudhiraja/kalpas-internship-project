import { createContext, useState } from "react";

export const ViewContext = createContext(null);

const ViewProvider = ({ children }) => {
  const [viewState, setViewState] = useState("list");

  return (
    <ViewContext.Provider
      value={{
        viewState,
        setViewState,
      }}
    >
      {children}
    </ViewContext.Provider>
  );
};

export default ViewProvider;
