const jsdom = require('jsdom')
const { JSDOM } = jsdom
const fetch = require('node-fetch')

let startURL = 'http://vhost3.lnu.se:20080/weekend'
let days = ['Friday', 'Saturday', 'Sunday']

getCalendarBody(startURL)
async function getCalendarBody(startURL) {
    let url = await fetch(startURL)
    url = await url.text()
    const dom = new JSDOM(url)
    url = dom.window.document.querySelectorAll('a')[0] // Här callar vi endast kalender url, men om vi sätter 1 så blire cinema url
    getPeopleUrl(url)
}

async function getPeopleUrl(peoplePage) {
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
    console.log(acceptedDay)
}

function computeAnswears(answears) {
    for(let i = answears.length; i <= answears.length; i++) {
        for(let j = 0; j < answears.length; j++) {
            //Denna funkar ej om all 3 ej kan på samma dag, t.ex fredag, gör om till 1 === ok && 2 === ok && 3 === ok
            //Men denna va snyggare
            if(answears[i-1][j] ===  answears[i-2][j] && answears[i-2][j] === answears[i-3][j]) {
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