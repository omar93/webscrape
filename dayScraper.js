const links = require('./linkScraper')
const fetch = require('node-fetch')
const jsdom = require('jsdom')

const { JSDOM } = jsdom

module.exports = { getMeetingDay } // Returns the agreed upon day

async function getMeetingDay() {
    let dayMatch
    let answears = []
    let personUrl = await links.getPeopleCalendarUrl('http://vhost3.lnu.se:20080/weekend')
    console.log('Scraping links...OK')
    for(i = 0; i < 3; i++) {
        let okData = await formatOkData(personUrl[i])
        answears.push(okData)
    }
    dayMatch = getDayMatch(answears)
    console.log(dayMatch)
    return dayMatch
}

async function formatOkData(link) {
    let dates = []
    let url = await fetch(link)
    url = await url.text()
    const dom = new JSDOM(url)
    let links = dom.window.document.querySelectorAll('td')
    for (let i = 0; i < links.length; i++) {
        dates.push(links[i].textContent.toLowerCase())
    }
    return dates
}

function getDayMatch(answears) {
    let days = ['Friday', 'Saturday', 'Sunday']
    for(let i = answears.length; i <= answears.length; i++) {
        for(let j = 0; j < answears.length; j++) {
            if(answears[i-1][j] ===  'ok' && answears[i-2][j] === 'ok' && answears[i-3][j] === 'ok') {
                return days[j]
            }
        }
    }
    return null
}











async function getAgreedDay() {
    let dayNumber = getAgreedDayNumber(dayarray)
    let days = ['Friday', 'Saturday', 'Sunday']
    day = days[dayNumber]
    console.log('Scraping available days...OK')
    console.log('Agreed day: ' + day)
}