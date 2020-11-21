const links = require('./linkScraper')
const fetch = require('node-fetch')
const jsdom = require('jsdom')
const { JSDOM } = jsdom

async function scrapeOks() {
    let oks = []
    let urls = await links.scrapeLinks('http://vhost3.lnu.se:20080/weekend')
    for(i = 0; i < 3; i++) {
        oks.push(getOkDates(urls[i]))
    }
    return oks
}
scrapeOks()
getAgreedDay()

async function getAgreedDay() {
    let dayNumber = getAgreedDayNumber(dayarray)
    let days = ['Friday', 'Saturday', 'Sunday']
    day = days[dayNumber]
    console.log('Scraping available days...OK')
    console.log('Agreed day: ' + day)
}


async function getOkDates(peronsUrl) {
    let dates = []
    let url = await fetch(peronsUrl)
    url = await url.text()
    const dom = new JSDOM(url)
    let links = dom.window.document.querySelectorAll('td')
    for (let i = 0; i < links.length; i++) {
        dates.push(links[i].textContent.toLowerCase())
    }
    return dates
}

function getAgreedDayNumber(answears) {
    for (let i = answears.length; i <= answears.length; i++) {
        for (let j = 0; j < answears.length; j++) {
            if (answears[i - 1][j] === 'ok' && answears[i - 2][j] === 'ok' && answears[i - 3][j] === 'ok') {
                return j
            }
        }
    }
    return
}