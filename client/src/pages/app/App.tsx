import "../../index.css";
import { Env } from "@semoss/sdk";
import { InsightProvider } from "@semoss/sdk";
import { RootStore } from "../../stores/root.store";
import { AppContext } from "../../contexts/app-context";
import { initializeMobX } from "../../stores/mobx-config";
import { Router } from "../Router";
import { HashRouter } from "react-router-dom";

if (process.env.NODE_ENV !== "production") {
  Env.update({
    MODULE: process.env.MODULE || "",
    ACCESS_KEY: process.env.ACCESS_KEY || "",
    SECRET_KEY: process.env.SECRET_KEY || "",
    APP: process.env.APP || "",
  });
}
const _root = new RootStore();

if (typeof window !== "undefined") {
  initializeMobX();
}

function App() {
  return (
    <InsightProvider>
      <AppContext.Provider
        value={{
          rootStore: _root,
        }}
      >
        <HashRouter>
          <Router />
        </HashRouter>
      </AppContext.Provider>
    </InsightProvider>
  );
}

export default App;
