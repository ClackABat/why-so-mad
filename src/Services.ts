import parse from "node-html-parser";
import { IRandomResult } from "./Models";

const API_URL = "https://en.wikipedia.org/w/api.php";

export async function getRandomResult() {
  var params = {
    action: "query",
    format: "json",
    list: "random",
    rnlimit: "5",
    rnnamespace: "0",
  };

  let url = API_URL + "?origin=*";
  Object.keys(params).forEach(function (key) {
    url += "&" + key + "=" + (params as any)[key];
  });

  const res = await fetch(url);
  const json = await res.json();
  return json.query.random;
}

export async function getInTheNews() {
  var params = {
    action: "query",
    format: "json",
    prop: "revisions",
    titles: "Template:In_the_news",
    rvprop: "content",
    rvparse: 1,
  };

  let url = API_URL + "?origin=*";
  Object.keys(params).forEach(function (key) {
    url += "&" + key + "=" + (params as any)[key];
  });

  const res = await fetch(url);
  const json = await res.json();
  //query.pages[482256].revisions[0]
  const page =
    json.query.pages[Object.keys(json.query.pages)[0]].revisions[0]["*"];
  const parsed = parse(page);
  const entries = parsed.querySelector("ul")?.childNodes;
  if (!entries) throw new Error("Could not parse In the news");
  // Filter out empty entries
    const filtered = entries.filter((entry) => {
        return entry.text.trim() !== "";
    });
  const randomEntry = filtered[Math.floor(Math.random() * filtered.length)];
  //   console.log(json.query.pages[])
  return randomEntry.rawText;
}
