const jsdom = require('jsdom')
const { JSDOM } = jsdom
const fetch = require('node-fetch')

let startURL = 'http://vhost3.lnu.se:20080/weekend'
let days = ['Friday', 'Saturday', 'Sunday']
let day = ''

getCalendarBody(startURL)
async function getCalendarBody(startURL) {
    let url = await fetch(startURL)
    url = await url.text()
    const dom = new JSDOM(url)
    calendarURL = dom.window.document.querySelectorAll('a')[0] // Här callar vi endast kalender url, men om vi sätter 1 så blire cinema url
    let day = await getDays(calendarURL)
    console.log(day)
    let pickDay = await scrapeDay(dom.window.document.querySelectorAll('a')[1])
    console.log(pickDay)
}

async function scrapeDay(dayURL) {
    let div = await fetch(dayURL)
    div = await div.text()
    const dom = new JSDOM(div)

    let dayz = dom.window.document.querySelector('#day')
    return dayz.textContent
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
