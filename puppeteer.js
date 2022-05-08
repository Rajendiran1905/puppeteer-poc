const { readFileSync } = require("fs");
const puppeteer = require("puppeteer");
const ejs = require("ejs");

const ejsTemplate = readFileSync("./templates/index.ejs", { encoding: "utf-8" });

class Puppeteer {
    browserInstance = null;

    async getBrowserInstance() {
        if (this.browserInstance) return this.browserInstance;

        this.browserInstance = await puppeteer.launch({
            headless: true,
            args: [
                "--disable-gpu",
                "--disable-dev-shm-usage",
                "--disable_setuid-sandbox",
                "--no-sandbox"
            ],
        });

        return this.browserInstance;
    }

    async generatePDF() {
        const template = ejs.compile(ejsTemplate);

        const htmlString = template({
            title: "This is PDF sample",
            list: ["Item 1", "Item 2", "item 3"],
        });

        const page = await (await this.getBrowserInstance()).newPage();

        await page.setContent(htmlString, {
            waitUntil: "networkidle2",
        });

        const pdf = await page.pdf({ format: "a4" });

        page.close();

        return pdf;
    }
}

module.exports = new Puppeteer();
