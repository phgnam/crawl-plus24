const express = require('express');
const fs = require('fs');
const csv = require('csv-stringify/lib/sync');
const path = require('path');
const moment = require('moment');
const app = express();
const browserObject = require('./browser');
const scraperController = require('./pageController');

//Start the browser and create a browser instance
let browserInstance;
let page;
(async () => {
  browserInstance = await browserObject.startBrowser();
  // page = await browserInstance.newPage();
  // await page.goto("https://plus24.mbs.com.vn/apps/StockBoard/MBS/CW.html");
  // await page.waitForSelector("#boardData");
})()

async function crawl() {
  page = await browserInstance.newPage();
  await page.goto("https://plus24.mbs.com.vn/apps/StockBoard/MBS/CW.html");
  await page.waitForSelector("#boardData");
  let urls = await page.evaluate(() => {
    $AV('StockBoard.CW').processAll();
    let data = [];
    for (let i = 0; i < $("#boardData").children().length; i += 2) {
      const record = $("#boardData").children()[i];
      const metrics = $("#boardData").find(record).children();
      data.push({
        "Ma CQ": $("#boardData").find(metrics[0]).text().trim(),
        "To chuc phat hanh": $("#boardData").find(metrics[1]).children().first().text().trim(),
        "Ngay dao han": $("#boardData").find(metrics[1]).children().last().text().trim(),
        "Tran": $("#boardData").find(metrics[2]).text().trim(),
        "San": $("#boardData").find(metrics[3]).text().trim(),
        "Tham chieu": $("#boardData").find(metrics[4]).text().trim(),
        "Du mua - Gia 3": $("#boardData").find(metrics[5]).text().trim(),
        "Du mua - KL 3": $("#boardData").find(metrics[6]).text().trim(),
        "Du mua - Gia 2": $("#boardData").find(metrics[7]).text().trim(),
        "Du mua - KL 2": $("#boardData").find(metrics[8]).text().trim(),
        "Du mua - Gia 1": $("#boardData").find(metrics[9]).text().trim(),
        "Du mua - KL 1": $("#boardData").find(metrics[10]).text().trim(),
        "Khop lenh - Gia": $("#boardData").find(metrics[11]).text().trim(),
        "Khop lenh - Phan tram thay doi %": $("#boardData").find(metrics[12]).children().first().text().trim(),
        "Khop lenh - Phan tram thay doi \+/\-": $("#boardData").find(metrics[12]).children().last().text().trim(),
        "Khop lenh - KL": $("#boardData").find(metrics[13]).text().trim(),
        "Du ban - Gia 1": $("#boardData").find(metrics[14]).text().trim(),
        "Du ban - KL 1": $("#boardData").find(metrics[15]).text().trim(),
        "Du ban - Gia 2": $("#boardData").find(metrics[16]).text().trim(),
        "Du ban - KL 2": $("#boardData").find(metrics[17]).text().trim(),
        "Du ban - Gia 3": $("#boardData").find(metrics[18]).text().trim(),
        "Du ban - KL 3": $("#boardData").find(metrics[19]).text().trim(),
        "Tong GT": $("#boardData").find(metrics[20]).children().first().text().trim(),
        "Tong KL": $("#boardData").find(metrics[20]).children().last().text().trim(),
        "Du - Mua": $("#boardData").find(metrics[21]).children().first().text().trim(),
        "Du - Ban": $("#boardData").find(metrics[22]).children().first().text().trim(),
        "Gia - Cao": $("#boardData").find(metrics[21]).children().last().text().trim(),
        "Gia - Thap": $("#boardData").find(metrics[22]).children().last().text().trim(),
        "NDTNN - Mua": $("#boardData").find(metrics[23]).children().first().text().trim(),
        "NDTNN - Ban": $("#boardData").find(metrics[24]).children().first().text().trim(),
        "Co so - Ma CK": $("#boardData").find(metrics[23]).children().last().text().trim(),
        "Co so - Gia": $("#boardData").find(metrics[24]).children().last().text().trim(),
        "TH": $("#boardData").find(metrics[25]).text().trim(),
        "Do lech": $("#boardData").find(metrics[26]).text().trim(),
        "TL CD": $("#boardData").find(metrics[27]).text().trim(),
        "DHV": $("#boardData").find(metrics[28]).text().trim(),
      })
    }
    return data
  })
  await page.close()
  return urls
}
// let browserInstance = browserObject.startBrowser();

app.get('/', async (req, res) => {
  try {
    fs.unlinkSync(path.resolve(__dirname, `./test.csv`))
  } catch (e) {}
  const resultRaw = await crawl()
  // const currentDateString = moment().utc().format('YYYY-MM-DD_HH-mm-ss')
  const fileName = `test.csv`
  const filePath = path.resolve(__dirname, `./${fileName}`);
  const csvData = csv(resultRaw, {
    header: true
  })
  await fs.promises.writeFile(filePath, csvData);
  res.download(filePath);
});

app.get('*', async (req, res) => {
  res.json({
    errorMessage: "404 Not Found"
  });
});

const port = process.env.PORT || 8085;

app.listen(port, function () {
  console.log("Server is running port:", port);
});