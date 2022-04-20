export interface RequestMapParams {
  dataSource: String,
  zoomLevel: String,
  latLng: Array<Number>
}
export interface RequestOutputParams {
  outputPath: String,
  id: String,
}

/**
 * 
 * @param input 
 * @description
 * curl --location --request POST 'https://prod-13.southeastasia.logic.azure.com:443/workflows/2a0ee445c2a0436190738c4e873f5c8b/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Y_D3z7E2H-NXGRr87UrVMpFcL3I_3jQfjzupGesDKCY' \
 * --header 'Content-Type: application/json' \
 * --data-raw '{
 *     "input1":"300"
 * }'
 */
export const requestMap = async (input: RequestMapParams) => {
  const url = 'https://prod-01.southeastasia.logic.azure.com:443/workflows/892bdfd36a7a48e19b95fa9d7bc9cf3f/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=hZzCpq3yGC2UrIj3DJk0oBKj4Lg-zxjij1LLTvPY4A4';
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      input1: "300"
    })
  });
  const data = await res.json();
  console.log('requestMap:', data);
  return data;
};

/**
 * 
 * @param input 
 * @returns 
 * @description curl --location --request POST 'https://prod-11.southeastasia.logic.azure.com:443/workflows/5ea50d4c202f47feacf0b4f2e97967c4/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=_qui8ubZ9OHKWws5McbDWAuCrLcqGl787W50MFd-ThI' \
 * --header 'Content-Type: application/json' \
 * --data-raw '{
 *     "SeanFileName":"myimage2.jpg"
 * }'
 */
export const queryOutput = async (input: RequestOutputParams) => {
  const url = 'https://prod-11.southeastasia.logic.azure.com:443/workflows/5ea50d4c202f47feacf0b4f2e97967c4/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=_qui8ubZ9OHKWws5McbDWAuCrLcqGl787W50MFd-ThI';
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      SeanFileName: "myimage2.jpg"
    })
  });
  const data = await res.text();
  console.log('queryOutput:', data);
  return data;
};