const fetch = require('node-fetch')
const jsdom = require('jsdom')
const { JSDOM } = jsdom

// Returns array with all links that is scraped
async function getPagesUrls(url) {
    let pages = []
    let links = await fetch(url)
    links = await links.text()
    const dom = new JSDOM(links)
    let linkArray = dom.window.document.querySelectorAll('a')
    for(let i = 0; i < linkArray.length; i++) {
       pages.push(linkArray[i].getAttribute('href'))
    }
    return pages
}


async function scrapeLinks(url) {
    let arr = []
    let pages = await getPagesUrls(url)
    let people = await getPagesUrls(pages[0])
    console.log('Scraping links...OK')
    for (i = 0; i < 3; i++) {
        arr.push((pages[0]+people[i]))
    }
    return arr
}

module.exports = { scrapeLinks }