const express = require("express");

const puppeteer = require("./puppeteer");

const app = express();

app.get("/", async (req, res) => {
    const pdfBuffer = await puppeteer.generatePDF();

    res.writeHead(200, {
        "Content-Disposition": "attachment;filename=sample.pdf",
        "Content-Type": "application/pdf",
    });
    res.write(pdfBuffer);
    res.end();
});

app.listen(8001);