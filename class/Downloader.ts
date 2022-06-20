import Axios from "axios";
import fs from "fs";
import Path from "path";
import { Util } from "./util";

/**
 *
 * @export
 * @class Downloader
 */

export class Downloader {
  private readonly url: string;
  constructor() {
    this.url = "https://donnees.roulez-eco.fr/opendata/instantane"; // use env file for change this url ?
  }

  public async download(): Promise<void> {
    let util = new Util();
    const path = Path.resolve('./files',`${util.dateProvider}_fichier.xml`); // Edit this function and no frogot delete this 
                                                                             //folder because this using only for development
    const response = await Axios({
      method: "get",
      url: this.url,
      responseType: "stream",
    });
    response.data.pipe(fs.createWriteStream(path));

    return new Promise<void>((resolve, reject) => {
      response.data.on("end", () => {
        resolve();
      });
      response.data.on("error", (error: any) => {
        reject(error);
      });
    });
  }
}
