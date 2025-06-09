import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useInsight } from "@semoss/sdk";
import { useAppContext } from "../../hooks";
import { useEffect, useState } from "react";
import { ROUTE_PATH_LOGIN } from "../../components/shared";
import LoadingScreen from "../../components/shared/loading-screen";
import { PageWrapper } from "../page-wraper/page-wrapper";

/**
 * Check for authentication, otherwise reroute to login
 */
export const AuthenticatedLayout = () => {
  const { insightId, isAuthorized } = useInsight();
  const { rootStore } = useAppContext();
  const location = useLocation();

  /**
   * State
   */
  const [isInitialized, setIsInitialized] = useState<boolean>(true);

  /**
   * Functions
   */
  const initialize = async (insightId: string) => {
    // initialize it
    await rootStore.initialize(insightId);
    setIsInitialized(true);
  };

  /**
   * Effects
   */
  useEffect(() => {
    if (insightId) {
      initialize(insightId);
    }
  }, [insightId]);

  if (!isAuthorized) {
    return (
      //   <Navigate
      //     to={`/${ROUTE_PATH_LOGIN}`}
      //     state={{ from: location }}
      //     replace
      //   />
      <Navigate to={`/`} state={{ from: location }} replace />
    );
  }

  return (
    <PageWrapper>
      <Outlet />
    </PageWrapper>
  );
};
