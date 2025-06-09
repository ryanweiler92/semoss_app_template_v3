import { runPixel, partial } from "@semoss/sdk";

export const documentSummarizationFunc = async (
  route: String,
  file_path: String,
  engine_id: String
) => {
  const { errors, pixelReturn } = await runPixel(
    `ExecuteFunctionEngine ( engine = "ee2f8277-ecca-4936-9486-7414d6f434b9", map=[{'route' = '${route}', 'file_path': '${file_path}', 'engine_id': '${engine_id}'}] ) ;`
  );

  if (errors.length > 0) {
    throw new Error(errors.join(""));
  }

  const { output } = pixelReturn[0];

  return output;
};
