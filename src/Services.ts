import { IRandomResult } from "./Models";

export async function getRandomResult() {
  let result: IRandomResult[]= [];
  var url = "https://en.wikipedia.org/w/api.php";

  var params = {
    action: "query",
    format: "json",
    list: "random",
    rnlimit: "5",
    rnnamespace: "0",
  };

  url = url + "?origin=*";
  Object.keys(params).forEach(function (key) {
    url += "&" + key + "=" + (params as any)[key];
  });

  const res = await fetch(url);
  const json = await res.json();
  return json.query.random;
//   result = response.query.random;

//   fetch(url)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (response) {
//       result = response.query.random;
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
}
