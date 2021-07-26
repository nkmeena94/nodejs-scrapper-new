const fs = require('fs');
const scraperObject = {
    //url: 'https://bigfuture.collegeboard.org/college-university-search/swarthmore-college',
    url: 'https://bigfuture.collegeboard.org/college-university-search/',
    async scraper(browser, collegeObj, success) {
        let clgName = collegeObj.name.split('& ').join('').split(' ').join('-').toLowerCase();
        let page = await browser.newPage();

        collegeObj.majorPercentagedetails = "";
        try {
            let finalUrl = this.url + clgName;
            console.log(`Navigating to ${finalUrl}...`);
            //await page.goto(finalUrl);
            console.log("page Loading.....");
            await page.goto(finalUrl, {
                waitUntil: 'networkidle0',
                timeout: 600000
            });

            console.log("Page Loaded...");

            console.log("clicking on button..");


            let cilckElement = await page.evaluate(() => {
                let el = document.querySelector("#cpProfile_tabs_forInternationalStudents_anchor a")
                el.click();
                return el ? el.innerText : ""
            })

            console.log("cilckElement: " + cilckElement)


            let scrapElement = await page.evaluate(() => {
                let el = document.querySelector(".padTop20 ul")
                return el ? el.innerText : ""
            })
            collegeObj = getFinancialAidDetails(collegeObj, scrapElement);
            collegeObj.financial_aid_details_str = scrapElement;

        } catch (e) {
            console.log("Some Error accured for CLG: " + clgName);
            //console.log(e);
            // save details
            saveDataAsJson(collegeObj)
            saveErrorLog("save", collegeObj.orgId)
            saveErrorLog("error", collegeObj.orgId)
            await page.close();
            success(collegeObj);
        } finally {
            // console.log(collegeObj);
            console.log("Finally response return..");
            saveDataAsJson(collegeObj)
            saveErrorLog("save", collegeObj.orgId)
            await page.close();
            success(collegeObj);
        }


    }
}

module.exports = scraperObject;
async function saveErrorLog(logType, clgId) {


    if (logType == "error") {
        if (!fs.existsSync("scrapperData/errorClg.json")) {
            // Do something
            fs.writeFile('scrapperData/errorClg.json', '', function(err) {
                if (err) throw err;
                console.log('File is created successfully.');
            });
        }
        let rawdata = fs.readFileSync('scrapperData/errorClg.json');
        let clgData = [];
        if (rawdata != "") {
            clgData = JSON.parse(rawdata);
        }

        if (!clgData.includes(clgId)) {
            clgData.push(clgId);
            let data = JSON.stringify(clgData);
            fs.writeFileSync('scrapperData/saveClg.json', data);
        }

    } else {
        if (!fs.existsSync("scrapperData/saveClg.json")) {
            // Do something
            fs.writeFile('scrapperData/saveClg.json', '', function(err) {
                if (err) throw err;
                console.log('File is created successfully.');
            });
        }
        let rawdata = fs.readFileSync('scrapperData/saveClg.json');
        let clgData = [];
        if (rawdata != "") {
            clgData = JSON.parse(rawdata);
        }

        if (!clgData.includes(clgId)) {
            clgData.push(clgId);
            let data = JSON.stringify(clgData);
            fs.writeFileSync('scrapperData/saveClg.json', data);
        }
    }

}
async function saveDataAsJson(collegeObject) {
    if (!fs.existsSync("scrapperData/college_data.json")) {
        // Do something
        fs.writeFile('scrapperData/college_data.json', '', function(err) {
            if (err) throw err;
            console.log('File is created successfully.');
        });
    }

    let rawdata = fs.readFileSync('scrapperData/saveClg.json');
    let clgData = [];
    if (rawdata != "") {
        clgData = JSON.parse(rawdata);
    }
    console.log(clgData);
    //console.log(collegeObject);
    console.log("saving in file => " + (collegeObject.orgId))

    console.log(clgData.includes(collegeObject.orgId))

    if (!clgData.includes(collegeObject.orgId)) {
        console.log("clg Not included..");
        var college_data = fs.readFileSync('scrapperData/college_data.json');
        var json_college_data = [];
        if (college_data != "") {
            console.log("clg data is not null");
            json_college_data = JSON.parse(college_data);

        }
        json_college_data.push(collegeObject);
        let data = JSON.stringify(json_college_data);
        fs.writeFileSync('scrapperData/college_data.json', data);

    }


}

function getFinancialAidDetails(collegeObj, scrapElement) {
    const myArr = scrapElement.split("\n");
    console.log(myArr);
    var i = 0;
    for (i = 0; i < myArr.length; i++) {
        if (myArr[i].indexOf("International students eligible for") != -1) {
            collegeObj.international_students_eligible_for = myArr[i].replace("International students eligible for ", "");
        } else if (myArr[i].indexOf("Number of enrolled international undergraduates received aid") != -1) {
            collegeObj.number_of_enrolled_international_undergraduates_received_aid = myArr[i].replace("Number of enrolled international undergraduates received aid: ", "");
        } else if (myArr[i].indexOf("Total amount awarded") != -1) {
            collegeObj.amount_awarded = myArr[i].replace("Total amount awarded: ", "");
        }
    }
    return collegeObj;
}