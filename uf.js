const puppeteer = require('puppeteer');

(async () => {
    let date = process.argv[2].split('/')
    let year = date[2]
    let month = parseInt(date[1])
    let day = parseInt(date[0])
    let url = "https://www.sii.cl/valores_y_fechas/uf/uf2021.htm";
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    await page.select('#sel_anyo', year)
    try {
        let ufs = await page.$eval('#mes_all > div > table', table =>{
            return table.querySelector('tbody').textContent
        })

        let ufs_ = ufs.trim().split('\n')/*.filter(v => {
            return v != ""
        })*/
        let UF = []
        for (let index = 0; index < 31; index++) {
            let salto = index*15
            UF.push(ufs_.slice(salto,salto+15))
        }
        console.log(UF[day-1][month].trim())
    
        
    } catch (error) {
        console.error("Año no encontrado")
    }
    await browser.close();
})();