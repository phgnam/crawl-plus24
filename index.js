const express = require('express');
const app = express();
const browserObject = require('./browser');
const scraperController = require('./pageController');

//Start the browser and create a browser instance
let browserInstance;
let page;
(async () => {
  browserInstance = await browserObject.startBrowser();
  page = await browserInstance.newPage();
  await page.goto("https://plus24.mbs.com.vn/apps/StockBoard/MBS/CW.html");
  await page.waitForSelector("#boardData");
})()

async function crawl() {
  let urls = await page.evaluate(() => {
    $AV('StockBoard.CW').processAll();
    let data = [];
    for (let i = 0; i < $("#boardData").children().length; i += 2) {
      const record = $("#boardData").children()[i];
      const metrics = $("#boardData").find(record).children();
      data.push({
        "Mã CQ": $("#boardData").find(metrics[0]).text().trim(),
        "Tổ chức phát hành": $("#boardData").find(metrics[1]).children().first().text().trim(),
        "Ngày đáo hạn": $("#boardData").find(metrics[1]).children().last().text().trim(),
        "Trần": $("#boardData").find(metrics[2]).text().trim(),
        "Sàn": $("#boardData").find(metrics[3]).text().trim(),
        "Tham chiếu": $("#boardData").find(metrics[4]).text().trim(),
        "Dư mua - Giá 3": $("#boardData").find(metrics[5]).text().trim(),
        "Dư mua - KL 3": $("#boardData").find(metrics[6]).text().trim(),
        "Dư mua - Giá 2": $("#boardData").find(metrics[7]).text().trim(),
        "Dư mua - KL 2": $("#boardData").find(metrics[8]).text().trim(),
        "Dư mua - Giá 1": $("#boardData").find(metrics[9]).text().trim(),
        "Dư mua - KL 1": $("#boardData").find(metrics[10]).text().trim(),
        "Khớp lệnh - Giá": $("#boardData").find(metrics[11]).text().trim(),
        "Khớp lệnh - Phần trăn thay đổi %": $("#boardData").find(metrics[12]).children().first().text().trim(),
        "Khớp lệnh - Phần trăn thay đổi \+/\-": $("#boardData").find(metrics[12]).children().last().text().trim(),
        "Khớp lệnh - KL": $("#boardData").find(metrics[13]).text().trim(),
        "Dư bán - Giá 1": $("#boardData").find(metrics[14]).text().trim(),
        "Dư bán - KL 1": $("#boardData").find(metrics[15]).text().trim(),
        "Dư bán - Giá 2": $("#boardData").find(metrics[16]).text().trim(),
        "Dư bán - KL 2": $("#boardData").find(metrics[17]).text().trim(),
        "Dư bán - Giá 3": $("#boardData").find(metrics[18]).text().trim(),
        "Dư bán - KL 3": $("#boardData").find(metrics[19]).text().trim(),
        "Tổng GT": $("#boardData").find(metrics[20]).children().first().text().trim(),
        "Tổng KL": $("#boardData").find(metrics[20]).children().last().text().trim(),
        "Dư - Mua": $("#boardData").find(metrics[21]).children().first().text().trim(),
        "Dư - Bán": $("#boardData").find(metrics[22]).children().first().text().trim(),
        "Giá - Cao": $("#boardData").find(metrics[21]).children().last().text().trim(),
        "Giá - Thấp": $("#boardData").find(metrics[22]).children().last().text().trim(),
        "NĐTNN - Mua": $("#boardData").find(metrics[23]).children().first().text().trim(),
        "NĐTNN - Bán": $("#boardData").find(metrics[24]).children().first().text().trim(),
        "Cơ sở - Mã CK": $("#boardData").find(metrics[23]).children().last().text().trim(),
        "Cơ sở - Giá": $("#boardData").find(metrics[24]).children().last().text().trim(),
        "TH": $("#boardData").find(metrics[25]).text().trim(),
        "Độ lệch": $("#boardData").find(metrics[26]).text().trim(),
        "TL CĐ": $("#boardData").find(metrics[27]).text().trim(),
        "ĐHV": $("#boardData").find(metrics[28]).text().trim(),
      })
    }
    return data
  })
  return urls
}
// let browserInstance = browserObject.startBrowser();

app.get('/', async (req, res) => {
  res.json(await crawl());
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