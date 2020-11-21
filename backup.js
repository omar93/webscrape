const jsdom = require('jsdom')
const { JSDOM } = jsdom
const fetch = require('node-fetch')

let days = ['Friday', 'Saturday', 'Sunday']

async function getAgreedDay(startURL) {
    let day = ''
    let url = await fetch(startURL)
    url = await url.text()
    const dom = new JSDOM(url)
    calendarURL = dom.window.document.querySelectorAll('a')[0] // Här callar vi endast kalender url, men om vi sätter 1 så blire cinema url
    day = await getDays(calendarURL)
    return [day, dom.window.document.querySelectorAll('a')[1].getAttribute('href')]
}

async function getDays(peoplePage) {
    let url = await fetch(peoplePage)
    url = await url.text()
    const dom = new JSDOM(url)
    let links = dom.window.document.querySelectorAll('a')
    let linkPromises = []
    for (let i = 0; i < links.length; i++) {
        linkPromises.push(getOkDates(peoplePage + links[i].getAttribute('href')))
    }
    let answears = []
    answears = await Promise.all(linkPromises)
    let acceptedDay = computeAnswears(answears)
    day = days[acceptedDay]
    return days[acceptedDay]
}

function computeAnswears(answears) {
    for(let i = answears.length; i <= answears.length; i++) {
        for(let j = 0; j < answears.length; j++) {
            if(answears[i-1][j] ===  'ok' && answears[i-2][j] === 'ok' && answears[i-3][j] === 'ok') {
                return j
            }
        }
    }
    return null
}

async function getOkDates(peronsUrl) {
    let apa = []
    let url = await fetch(peronsUrl)
    url = await url.text()
    const dom = new JSDOM(url)
    let links = dom.window.document.querySelectorAll('td')
    for (let i = 0; i < links.length; i++) {
        apa.push(links[i].textContent.toLowerCase())
    }
    return apa
}

module.exports = {
    getAgreedDay
}