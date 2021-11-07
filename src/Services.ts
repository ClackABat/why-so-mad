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
  return randomEntry.rawText;
}

export async function getOnThisDay() {
  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" });
  var params = {
    action: "query",
    format: "json",
    prop: "revisions",
    titles: `Wikipedia:Selected anniversaries/${month}_${date.getDate()}`,
    rvprop: "content",
    rvparse: 1,
  };

  let url = API_URL + "?origin=*";
  Object.keys(params).forEach(function (key) {
    url += "&" + key + "=" + (params as any)[key];
  });

  const res = await fetch(url);
  const json = await res.json();
  const page =
    json.query.pages[Object.keys(json.query.pages)[0]].revisions[0]["*"];
  const parsed = parse(page);
  const entries = parsed.querySelector("div#mp-otd-img + ul")?.childNodes;
  if (!entries) throw new Error("Could not parse In the news");
  // Filter out empty entries
  const filtered = entries.filter((entry) => {
    return entry.text.trim() !== "";
  });
  const randomEntry = filtered[Math.floor(Math.random() * filtered.length)];
  return randomEntry.rawText;
}

export async function getRandomPageFromCategory(category: string) {
  // const url = `https://randomincategory.toolforge.org/?category=${category}&server=en.wikipedia.org&cmnamespace=0&cmtype=page&returntype=subject`;
  // const res = await fetch(url);
  // console.log(res);
}
