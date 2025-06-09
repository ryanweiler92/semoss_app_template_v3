import { useContext } from "react";

import { AppContext, AppContextType } from "../contexts/app-context";

/**
 * Access the current App Store
 * @returns the App Store
 */
export function useAppContext(): AppContextType {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }

  return context;
}
