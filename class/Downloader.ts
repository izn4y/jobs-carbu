import Axios from "axios";
import fs from "fs";
import yauzl from "yauzl";
import Path from "path";
import { Util } from "./util";
import dotenv from "dotenv";
dotenv.config();

/**
 * @export
 * @class Downloader
 */

export class Downloader {

  private readonly url: string | undefined;
  constructor() {
    this.url = process.env.DATA_GOUV_URL;
  }

  public async download(): Promise<void> {
    let util = new Util();
    let time: string = util.dateProvider(true);
    const path = Path.resolve("./files", `${time}.zip`); 

    const response = await Axios({
      method: "get",
      url: this.url,
      responseType: "stream",
    });
    response.data.pipe(fs.createWriteStream(path));

    new Promise<void>((resolve, reject) => {
      response.data.on("end", () => {
        this.fileFetching(path);
        resolve();
      });
      response.data.on("error", (error: any) => {
        reject(error);
      });
    });

  }

  private fileFetching(pPath: string) {
    yauzl.open(pPath, { lazyEntries: true }, (err, zipfile) => {
      if (err) throw err;
      zipfile.readEntry();
      zipfile.on("entry", (entry) => {
        if (/\/$/.test(entry.fileName)) {
          zipfile.readEntry();
        } else {
          // file entry

          zipfile.openReadStream(entry, (err, readStream) => {
            if (err) throw err;
            readStream.on("end", () => {
              zipfile.readEntry();
            });
            readStream.pipe(
              fs.createWriteStream(Path.join("./files", entry.fileName))
            );
          });
        }
      });
    });
  }
}
