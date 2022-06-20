import cron from "node-cron";
import { Downloader } from "./class/downloader";
import { Util } from "./class/util";

let downloader = new Downloader();
let util = new Util();
console.log(util.dateProvider());

cron.schedule("* * * * *", async () => {
  await downloader.download();
  console.log("Downloaded");
});
