import fs from "fs";

/**
 *
 * @export
 * @class Util
 */

export class Util {
	constructor() {}

    /**
     *
     * @return {*}  {string}
     * @memberof Util
     */

    public dateProvider(): string {
        let today: any = new Date();
		let hour: number = today.getHours();
		let minutes: number = today.getMinutes();
		let seconds: number = today.getSeconds();
		let time = hour + ":" + minutes + ":" + seconds
		let dd = String(today.getDate()).padStart(2, "0");
		let mm = String(today.getMonth() + 1).padStart(2, "0");
		let yyyy = today.getFullYear();
		today = `${dd}/${mm}/${yyyy}_${time}`;
        return today;
    }

    
    /**
     *
     *
     * @param {*} pError
     * @param {boolean} pIsFullError
     * @param {string} pNameFunction
     * @return {*}  {void}
     * @memberof Util
     */
    
public logger(pError: any, pIsFullError: boolean, pNameFunction: string): void {
		const DIR_LOG: string = "./log";
		const NAME_LOG: string = "error_log.txt";
		let info_Name: string = "Error in the function => ";

		if (!fs.existsSync(DIR_LOG)) {
			fs.mkdir(DIR_LOG, (err: any) => {
				if (err) throw err;

				if (!fs.existsSync(`${DIR_LOG}/${NAME_LOG}`)) {
					fs.writeFile(`${DIR_LOG}/${NAME_LOG}`, "", function (err) {
						if (err) throw err;
					});
				}
			});
		}
		let logger = fs.createWriteStream(`${DIR_LOG}/${NAME_LOG}`, {
			flags: "a",
		});

		if (!pError) return;
		if (!pIsFullError) pIsFullError = false;
		if (!pNameFunction)(pNameFunction = ""), (info_Name = "");
		if (pIsFullError) pError = pError.stack;

		let today: any = new Date();
		let hour: number = today.getHours();
		let minutes: number = today.getMinutes();
		let seconds: number = today.getSeconds();
		let time = hour + ":" + minutes + ":" + seconds
		let dd = String(today.getDate()).padStart(2, "0");
		let mm = String(today.getMonth() + 1).padStart(2, "0");
		let yyyy = today.getFullYear();


		today = `${dd}/${mm}/${yyyy}`;

		logger.write("\n");
		logger.write(`=============================[${today} ${time}]============================`);
		logger.write("\n");
		logger.write("\n");
		logger.write(`${info_Name}[${pNameFunction}]`);
		logger.write("\n");
		logger.write("\n");
		logger.write(pError.toString());
		logger.write("\n");
		logger.write("==============================================================================");
		logger.write("\n");
		logger.end();
	};


}