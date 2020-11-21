const fetch = require('node-fetch')

const jsdom = require('jsdom')
const { JSDOM } = jsdom


module.exports = class Day {
    constructor(url) {
        this.getAgreedDay(url)        
    }


    days = ['Friday', 'Saturday', 'Sunday']

    async getAgreedDay(startURL) {
        let day = ''
        let url = await fetch(startURL)
        url = await url.text()
        const dom = new JSDOM(url)
        calendarURL = dom.window.document.querySelectorAll('a')[0] // Här callar vi endast kalender url, men om vi sätter 1 så blire cinema url
        this.day = await getDays(calendarURL)
        return [this.day, dom.window.document.querySelectorAll('a')[1].getAttribute('href')]
    }

    async getDays(peoplePage) {
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

    computeAnswears(answears) {
        for (let i = answears.length; i <= answears.length; i++) {
            for (let j = 0; j < answears.length; j++) {
                if (answears[i - 1][j] === 'ok' && answears[i - 2][j] === 'ok' && answears[i - 3][j] === 'ok') {
                    return j
                }
            }
        }
        return null
    }

    async getOkDates(peronsUrl) {
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
}