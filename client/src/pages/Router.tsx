import { Routes, Route } from "react-router-dom";
import { createHashHistory } from "history";
import Dashboard from "./dashboard/dashboard";
import { AuthenticatedLayout } from "./authenticated-layout/authenticated-layout";

export const history = createHashHistory();

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthenticatedLayout />}>
        <Route index element={<Dashboard />} />
        {/* <Route path="deploy" element={<DeployModelsDashbaord />} />
        <Route path="help" element={<HelpDashboard />} /> */}
      </Route>
    </Routes>
  );
};
