const fetch = require('node-fetch')
const jsdom = require('jsdom')
const { JSDOM } = jsdom

// Returns an array with the links to each persons calendar page
async function getPeopleCalendarUrl(url) {

    let pages = []

    let links = await fetch(url)
    links = await links.text()
    const dom = new JSDOM(links)

    let linkArray = dom.window.document.querySelectorAll('a')

    for (let i = 0; i < linkArray.length; i++) {
        let newUrl = linkArray[i].getAttribute('href')
        if(newUrl.length > 10) {
            return getPagesUrls(newUrl)
        } else {
            pages.push(url+newUrl)
        }
    }
    
    return pages
}

module.exports = { getPeopleCalendarUrl } // Returns array with each persons calendar url