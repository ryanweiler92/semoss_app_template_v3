import { runPixel, partial } from "@semoss/sdk";
import { NodePoolDataResponse } from "../stores/nodePoolStore";

export const getNodePoolData = async (): Promise<NodePoolDataResponse> => {
  const { errors, pixelReturn } = await runPixel(`GetNodePoolsInfo();`);

  if (errors.length > 0) {
    throw new Error(errors.join(""));
  }

  const { output } = pixelReturn[0];

  return output as NodePoolDataResponse;
};

export const getMyRemoteModels = async () => {
  const { errors, pixelReturn } = await runPixel(`MyRemoteModelsStatus();`);

  if (errors.length > 0) {
    throw new Error(errors.join(""));
  }

  const { output } = pixelReturn[0];

  return output;
};

export const shutdownRemoteModel = async (modelId: string) => {
  const { errors, pixelReturn } = await runPixel(
    `RemoteModelShutdown ( engine = "${modelId}" ) ;`
  );

  if (errors.length > 0) {
    throw new Error(errors.join(""));
  }

  const { output } = pixelReturn[0];

  return output;
};

export const startRemoteModel = async (modelId: string) => {
  const { errors, pixelReturn } = await runPixel(
    `RemoteModelStart ( engine = "${modelId}" ) ;`
  );

  if (errors.length > 0) {
    throw new Error(errors.join(""));
  }

  const { output } = pixelReturn[0];

  return output;
};

export const visionAsk = async (
  engine: string,
  command: string,
  image: string
) => {
  const { errors, pixelReturn } = await runPixel(
    `Vision ( engine = "${engine}", command = "${command}", image = "${image}" ) ;`
  );

  if (errors.length > 0) {
    throw new Error(errors.join(""));
  }

  const { output } = pixelReturn[0];

  return output;
};

export const getMyRemoteModelEngines = async () => {
  const { errors, pixelReturn } = await runPixel(
    `MyEngines ( engineTypes = [ "MODEL" ] ) ;`
  );

  if (errors.length > 0) {
    throw new Error(errors.join(""));
  }
  const { output } = pixelReturn[0];

  const remoteModels = (output as any[])
    .filter((engine: any) => engine?.tag === "remote-model")
    .map((engine: any) => engine?.database_id || engine?.app_id);

  return remoteModels;
};

export const getModelDeploymentConfigs = async (refresh: Boolean) => {
  const { errors, pixelReturn } = await runPixel(
    `GetRemoteModelDeployConfigs ( refresh = ${refresh} ) ;`
  );

  if (errors.length > 0) {
    throw new Error(errors.join(""));
  }

  const { output } = pixelReturn[0];

  return output;
};

export const getAllRemoteModels = async () => {
  const { errors, pixelReturn } = await runPixel(
    `AdminMyEngines ( engineTypes = 'MODEL' ) ;`
  );

  if (errors.length > 0) {
    throw new Error(errors.join(""));
  }

  const { output } = pixelReturn[0];

  const remoteModels = (output as any[])
    .filter((engine: any) => engine?.tag === "remote-model")
    .map((engine: any) => ({
      id: engine?.engine_id,
      name: engine?.engine_name,
      subtype: engine?.engine_subtype || engine?.engine_type || "unknown",
    }));

  return remoteModels;
};
