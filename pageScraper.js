const scraperObject = {
    url: 'https://plus24.mbs.com.vn/apps/StockBoard/MBS/CW.html',
    async scraper(browser) {
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url);
        // Wait for the required DOM to be rendered
        await page.waitForSelector("#boardData");
        // Get the link to all the required books
        let urls = await page.evaluate(() => {
            let data = [];
            for (let i = 0; i < $("#boardData").children().length; i += 2) {
                const record = $("#boardData").children()[i];
                const metrics = $("#boardData").find(record).children();
                data.push({
                    "MaCQ": {
                        value: $("#boardData").find(metrics[0]).text().trim(),
                        title: "Mã CQ"
                    },
                    "ToChucPhatHanh": {
                        value: $("#boardData").find(metrics[1]).children().first().text().trim(),
                        title: "Tổ chức phát hành"
                    },
                    "NgayDaoHan": {
                        value: $("#boardData").find(metrics[1]).children().last().text().trim(),
                        title: "Ngày đáo hạn"
                    },
                    "Tran": {
                        value: $("#boardData").find(metrics[2]).text().trim(),
                        title: "Trần"
                    },
                    "San": {
                        value: $("#boardData").find(metrics[3]).text().trim(),
                        title: "Sàn"
                    },
                    "ThamChieu": {
                        value: $("#boardData").find(metrics[4]).text().trim(),
                        title: "Tham chiếu"
                    },
                    "DuMuaGia3": {
                        value: $("#boardData").find(metrics[5]).text().trim(),
                        title: "Dư mua - Giá 3"
                    },
                    "DuMuaKL3": {
                        value: $("#boardData").find(metrics[6]).text().trim(),
                        title: "Dư mua - KL 3"
                    },
                    "DuMuaGia2": {
                        value: $("#boardData").find(metrics[7]).text().trim(),
                        title: "Dư mua - Giá 2"
                    },
                    "DuMuaKL2": {
                        value: $("#boardData").find(metrics[8]).text().trim(),
                        title: "Dư mua - KL 2"
                    },
                    "DuMuaGia1": {
                        value: $("#boardData").find(metrics[9]).text().trim(),
                        title: "Dư mua - Giá 1"
                    },
                    "DuMuaKL1": {
                        value: $("#boardData").find(metrics[10]).text().trim(),
                        title: "Dư mua - KL 1"
                    },
                    "GiaKhop": {
                        value: $("#boardData").find(metrics[11]).text().trim(),
                        title: "Khớp lệnh - Giá"
                    },
                    "PhanTramThayDoi": {
                        value: $("#boardData").find(metrics[12]).children().first().text().trim(),
                        title: "Khớp lệnh - Phần trăn thay đổi %"
                    },
                    "PhanTramThayDoi+-": {
                        value: $("#boardData").find(metrics[12]).children().last().text().trim(),
                        title: "Khớp lệnh - Phần trăn thay đổi \+/\-"
                    },
                    "KLKhop": {
                        value: $("#boardData").find(metrics[13]).text().trim(),
                        title: "Khớp lệnh - KL"
                    },
                    "DuBanGia1": {
                        value: $("#boardData").find(metrics[14]).text().trim(),
                        title: "Dư bán - Giá 1"
                    },
                    "DuBanKL1": {
                        value: $("#boardData").find(metrics[15]).text().trim(),
                        title: "Dư bán - KL 1"
                    },
                    "DuBanGia2": {
                        value: $("#boardData").find(metrics[16]).text().trim(),
                        title: "Dư bán - Giá 2"
                    },
                    "DuBanKL2": {
                        value: $("#boardData").find(metrics[17]).text().trim(),
                        title: "Dư bán - KL 2"
                    },
                    "DuBanGia3": {
                        value: $("#boardData").find(metrics[18]).text().trim(),
                        title: "Dư bán - Giá 3"
                    },
                    "DuBanKL3": {
                        value: $("#boardData").find(metrics[19]).text().trim(),
                        title: "Dư bán - KL 3"
                    },
                    "TongGT": {
                        value: $("#boardData").find(metrics[20]).children().first().text().trim(),
                        title: "Tổng GT"
                    },
                    "TongKL": {
                        value: $("#boardData").find(metrics[20]).children().last().text().trim(),
                        title: "Tổng KL"
                    },
                    "Du_Mua": {
                        value: $("#boardData").find(metrics[21]).children().first().text().trim(),
                        title: "Dư - Mua"
                    },
                    "GiaCao": {
                        value: $("#boardData").find(metrics[21]).children().last().text().trim(),
                        title: "Giá - Cao"
                    },
                    "Du_Ban": {
                        value: $("#boardData").find(metrics[22]).children().first().text().trim(),
                        title: "Dư - Bán"
                    },
                    "GiaThap": {
                        value: $("#boardData").find(metrics[22]).children().last().text().trim(),
                        title: "Giá - Thấp"
                    },
                    "NDTNN_Mua": {
                        value: $("#boardData").find(metrics[23]).children().first().text().trim(),
                        title: "NĐTNN - Mua"
                    },
                    "CoSo_MaCK": {
                        value: $("#boardData").find(metrics[23]).children().last().text().trim(),
                        title: "Cơ sở - Mã CK"
                    },
                    "NDTNN_Ban": {
                        value: $("#boardData").find(metrics[24]).children().first().text().trim(),
                        title: "NĐTNN - Bán"
                    },
                    "CoSo_Gia": {
                        value: $("#boardData").find(metrics[24]).children().last().text().trim(),
                        title: "Cơ sở - Giá"
                    },
                    "TH": {
                        value: $("#boardData").find(metrics[25]).text().trim(),
                        title: "TH"
                    },
                    "DoLech": {
                        value: $("#boardData").find(metrics[26]).text().trim(),
                        title: "Độ lệch"
                    },
                    "TL_CD": {
                        value: $("#boardData").find(metrics[27]).text().trim(),
                        title: "TL CĐ"
                    },
                    "DHV": {
                        value: $("#boardData").find(metrics[28]).text().trim(),
                        title: "ĐHV"
                    },
                })
            }
            return data
        })
        return urls
    }
}
module.exports = scraperObject;