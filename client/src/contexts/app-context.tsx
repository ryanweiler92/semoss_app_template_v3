import { createContext } from "react";

import { RootStore } from "../stores";

/**
 * Value
 */
export type AppContextType = {
  rootStore: RootStore;
};

/**
 * Context
 */
// export const AppContext = createContext<AppContextType>(undefined);
export const AppContext = createContext<AppContextType>({
  rootStore: {} as RootStore, // Provide a default value for rootStore
});
