const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://homer.sii.cl/");
    await page.screenshot({path: 'sii.png'});

    await browser.close();
})();