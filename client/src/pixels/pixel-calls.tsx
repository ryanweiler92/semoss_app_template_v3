import { runPixel, partial } from "@semoss/sdk";

export const getUserProjectList = async () => {
  const { errors, pixelReturn } = await runPixel(`GetProjectList();`);

  if (errors.length > 0) {
    throw new Error(errors.join(""));
  }
  const { output } = pixelReturn[0] as { output: any[] };

  return output;
};

export const getUserInfo = async () => {
  const { errors, pixelReturn } = await runPixel(`GetUserInfo();`);

  if (errors.length > 0) {
    throw new Error(errors.join(""));
  }
  const { output } = pixelReturn[0];

  return output;
};

export const getOpenInsights = async () => {
  const { errors, pixelReturn } = await runPixel(`MyOpenInsights();`);

  if (errors.length > 0) {
    throw new Error(errors.join(""));
  }
  const { output } = pixelReturn[0];

  return output;
};

export const getAvailableEngines = async () => {
  const { errors, pixelReturn } = await runPixel(
    `MyEngines ( engineTypes = [ "MODEL" ] ) ;`
  );

  if (errors.length > 0) {
    throw new Error(errors.join(""));
  }
  const { output } = pixelReturn[0];

  return output;
};

export const getLLMs = async () => {
  const { errors, pixelReturn } = await runPixel(
    `MyEngines ( engineTypes = [ "MODEL" ] ) ;`
  );

  if (errors.length > 0) {
    throw new Error(errors.join(""));
  }
  const { output } = pixelReturn[0];

  const llms = (output as any[]).filter((engine: any) => {
    return engine?.tag == "text-generation";
  });

  llms.sort((a, b) => {
    if (a.database_name === "Llama3-70B-Instruct") return -1;
    if (b.database_name === "Llama3-70B-Instruct") return 1;
    if (a.database_name === "GPT-4o") return -1;
    if (b.database_name === "GPT-4o") return 1;
    return 0;
  });

  return llms;
};
