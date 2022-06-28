import cron from "node-cron";
import { Downloader } from "./class/downloader";

let downloader = new Downloader();

cron.schedule("* * * * *", async () => {
  await downloader.run()
});
