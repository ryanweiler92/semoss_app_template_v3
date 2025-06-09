import axios from "axios";
import { Env } from "@semoss/sdk";

/**
 * Run a pixel string
 *
 * @param pixel - pixel
 * @param insightId - id of the insight to run
 */
export const runPixel = async <O>(pixel: string, insightId?: string) => {
  if (!pixel) {
    throw Error("No Pixel To Execute");
  }

  // build the expression
  let postData = "";

  postData += "expression=" + encodeURIComponent(pixel);
  if (insightId) {
    postData += "&insightId=" + encodeURIComponent(insightId);
  }

  const response = await axios
    .post<{
      insightID: string;
      pixelReturn: {
        isMeta: boolean;
        operationType: string[];
        output: O;
        pixelExpression: string;
        pixelId: string;
      }[];
    }>(`${Env.MODULE}/api/engine/runPixel`, postData, {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    })
    .catch((error) => {
      // throw the message
      throw Error(error.response.data.errorMessage);
    });

  // there was no response, that is an error
  if (!response) {
    throw Error("No Pixel Response");
  }

  const errors: { code: number; message: string }[] = [];

  // collect the errors
  for (const p of response.data.pixelReturn) {
    const { output, operationType } = p;

    if (operationType.indexOf("ERROR") > -1) {
      errors.push(output as { code: number; message: string });
    }
  }

  return {
    errors: errors,
    insightId: response.data.insightID,
    pixelReturn: response.data.pixelReturn,
  };
};

export const uploadFile = async (
  files: File[],
  insightId: string | null,
  projectId?: string | null,
  path?: string | null
) => {
  let param = "";
  if (insightId || projectId || path) {
    if (insightId) {
      if (param.length > 0) {
        param += "&";
      }
      param += `insightId=${insightId}`;
    }

    if (projectId) {
      if (param.length > 0) {
        param += "&";
      }
      param += `projectId=${projectId}`;
    }

    if (path) {
      if (param.length > 0) {
        param += "&";
      }
      param += `path=${path}`;
    }

    param = `?${param}`;
  }

  const url = `${Env.MODULE}/api/uploadFile/baseUpload${param}`,
    fd: FormData = new FormData();

  if (Array.isArray(files)) {
    for (let i = 0; i < files.length; i++) {
      fd.append("file", files[i]);
    }
  } else {
    // pasted data
    fd.append("file", files);
  }

  const response = await axios.post<
    {
      fileName: string;
      fileLocation: string;
    }[]
  >(url, fd, {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });

  return response.data;
};

/**
 * Download a file by using a unique key
 *
 * @param insightID - insightID to download the file
 * @param fileKey - id for the file to download
 */
export const download = async (insightID: string, fileKey: string) => {
  return new Promise<void>((resolve) => {
    // create the download url
    const url = `${
      Env.MODULE
    }/api/engine/downloadFile?insightId=${insightID}&fileKey=${encodeURIComponent(
      fileKey
    )}`;

    // fake clicking a link
    const link: HTMLAnchorElement = document.createElement("a");

    link.href = url;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);

    // resolve the promise
    resolve();
  });
};
