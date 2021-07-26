const pageScraper = require('./pageScraper');
async function scrapeAll(browserInstance, collegeObjList, success) {
    let browser;
    try {
        browser = await browserInstance;
        for (var i = 0; i < collegeObjList.length; i++) {
            await pageScraper.scraper(browser, collegeObjList[i], success);
        }
        //await pageScraper.scraper(browser, collegeObjList, success);

    } catch (err) {
        console.log("Could not resolve the browser instance => ", err);
    } finally {
        console.log("PageController Finally");
    }
}

module.exports = (browserInstance, collegeObjList, success) => scrapeAll(browserInstance, collegeObjList, success)