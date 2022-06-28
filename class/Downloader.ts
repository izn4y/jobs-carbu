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

  static readonly URL: string | undefined = process.env.DATA_GOUV_URL;
  static readonly PATH_DESTINATION: any = process.env.DEST_PATH;

  constructor() {
   
  }


public run(){
    this.download()
  }
  
  /**
   *
   * @return {*}  {Promise<void>}
   * @memberof Downloader
   */

  private async download(): Promise<void> {
    let util = new Util();
    let time: string = util.dateProvider(true);
    const path = Path.resolve(Downloader.PATH_DESTINATION, `${time}.zip`); 

    const response = await Axios({
      method: "get",
      url: Downloader.URL,
      responseType: "stream",
    });
    response.data.pipe(fs.createWriteStream(path));

    new Promise<void>((resolve, reject) => {
      response.data.on("end", () => {
        this.fileFetching(path,time)
        resolve();
      });
      response.data.on("error", (error: any) => {
        reject(error);
      });
    });

  }

  /**
   *
   * @private
   * @param {string} pPath
   * @param {string} pfileName
   * @memberof Downloader
   */

  private fileFetching(pPath: string,pfileName: string) {
    yauzl.open(pPath, { lazyEntries: true }, (err, zipfile) => {
      if (err) throw err;
      zipfile.readEntry();
      zipfile.on("entry", (entry) => {
        entry.fileName = `${pfileName}.xml`
        fs.unlinkSync(`${Downloader.PATH_DESTINATION}/${pfileName}.zip`);
        if (/\/$/.test(entry.fileName)) {
          zipfile.readEntry();
        } else {
          zipfile.openReadStream(entry, (err, readStream) => {
            if (err) throw err;
            readStream.on("end", () => {
              zipfile.readEntry();
            });
            readStream.pipe(
              fs.createWriteStream(Path.join(Downloader.PATH_DESTINATION, entry.fileName))
            );
          });
        }
      });
    });
  }
}
