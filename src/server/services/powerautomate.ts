const { PA_ATTEND_MODE } = process.env;
import { PowerautomateUrls, MapQGISParamsType } from "../utils/constants";
export interface RequestMapParams {
  dataSource: String;
  zoomLevel: String;
  latLng: Array<Number>;
}
export interface RequestOutputParams {
  outputPath: String;
  id: String;
}

export interface RequestMapResponse {
  result: RequestMapResult;
}
interface RequestMapResult {
  url: String;
}

export const requestMap = async (
  input: MapQGISParamsType
): Promise<RequestMapResponse> => {
  const mode = `${PA_ATTEND_MODE}`;
  let result;
  if (mode == "attended") {
    result = await requestMapAttended(input);
  } else {
    console.log("attended");
    result = await requestMapUnattended(input);
  }


  if (result.error) {
    console.log(`${mode} call error, trying the run with other mode`);
    result = mode == "attended" ? await requestMapUnattended(input) :await requestMapAttended(input)  ;
  }

  return result;
};

/**
 *
 * @param input
 * @description
 */
export const requestMapUnattended = async (
  input: MapQGISParamsType
): Promise<RequestMapResponse> => {
  const url = PowerautomateUrls.MapGeneration.unattended;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });
  const data: RequestMapResponse = await res.json();
  console.log("requestMap and wait result:", data);
  return data;
};

/**
 *
 * @param input
 * @returns
 */
export const requestMapAttended = async (
  input: MapQGISParamsType
): Promise<RequestMapResponse> => {
  const url = PowerautomateUrls.MapGeneration.attended;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });
  const data: RequestMapResponse = await res.json();
  console.log("requestMap and wait result:", data);
  return data;
};
