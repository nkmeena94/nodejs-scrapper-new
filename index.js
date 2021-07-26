const request = require('request');
const fs = require('fs');
// const cheerio = require('cheerio');

console.log(`Running  Application\n`)

const URL = "https://bigfuture.collegeboard.org/college-university-search/swarthmore-college";

const browserObject = require('./browser');
const scraperController = require('./pageController');

let rawdata = fs.readFileSync('/home/navalmeena/projects/node/scrapper/scrapperData/api_response.json');
let clgData = [];
if (rawdata != "") {
    clgData = JSON.parse(rawdata);
}
console.log("data size: " + clgData.length);
// //Start the browser and create a browser instance

async function read() {
    let browserInstance = browserObject.startBrowser();
    // total  = 3690
    console.log("Reading file data..");
    var i = 0;
    // console.time("dbsave");
    while (i < 1000) {
        console.log("from i: " + i);
        let tempArry = clgData.slice(i, (i + 10));
        //await scrapCollegeData(tempArry);
        await scraperController(browserInstance, tempArry, (htmlResponse) => {
            console.log("Response fetched with HTML DOM");
        });
        // console.log(tempArry);
        i = i + 10;
    }
    console.log("1TOTAL Execution time: ");
    //  console.timeEnd("dbsave");

} // read close

async function read2() {
    let browserInstance = browserObject.startBrowser();
    // total  = 3690
    console.log("Reading file data..");
    var i = 1000;
    //  console.time("dbsave");
    while (i < 2000) {
        console.log("from i: " + i);
        let tempArry = clgData.slice(i, (i + 10));
        //await scrapCollegeData(tempArry);
        await scraperController(browserInstance, tempArry, (htmlResponse) => {
            console.log("Response fetched with HTML DOM");
        });
        // console.log(tempArry);
        i = i + 10;
    }
    console.log("2TOTAL Execution time: ");
    //  console.timeEnd("dbsave");

} // read close

async function read3() {
    let browserInstance = browserObject.startBrowser();
    // total  = 3690
    console.log("Reading file data..");
    var i = 2000;
    //  console.time("dbsave");
    while (i < 3000) {
        console.log("from i: " + i);
        let tempArry = clgData.slice(i, (i + 10));
        //await scrapCollegeData(tempArry);
        await scraperController(browserInstance, tempArry, (htmlResponse) => {
            console.log("Response fetched with HTML DOM");
        });
        // console.log(tempArry);
        i = i + 10;
    }
    console.log("3TOTAL Execution time: ");
    //console.timeEnd("dbsave");

} // read close

async function read4() {
    let browserInstance = browserObject.startBrowser();
    // total  = 3690
    console.log("Reading file data..");
    var i = 3000;
    // console.time("dbsave");
    while (i < 4000) {
        console.log("from i: " + i);
        let tempArry = clgData.slice(i, (i + 10));
        //await scrapCollegeData(tempArry);
        await scraperController(browserInstance, tempArry, (htmlResponse) => {
            console.log("Response fetched with HTML DOM");
        });
        // console.log(tempArry);
        i = i + 10;
    }
    console.log("4TOTAL Execution time: ");
    // console.timeEnd("dbsave");

} // read close

async function read5() {
    let browserInstance = browserObject.startBrowser();
    // total  = 3690
    console.log("Reading file data..");
    var i = 4000;
    while (i < 5000) {
        console.log("from i: " + i);
        let tempArry = clgData.slice(i, (i + 10));
        //await scrapCollegeData(tempArry);
        await scraperController(browserInstance, tempArry, (htmlResponse) => {
            console.log("Response fetched with HTML DOM");
        });
        // console.log(tempArry);
        i = i + 10;
    }
    console.log("5TOTAL Execution time: ");


} // read close


console.time("dbsave");

read();
read2();
read3();
read4();
read5();
console.timeEnd("dbsave");