const fetch = require('node-fetch')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
let startURL = 'http://vhost3.lnu.se:20080/weekend'
let day

module.exports = { startScraping }

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


async function startScraping() {
    let peopleLinkArr = []
    let pages = await getPagesUrls(startURL)
    let people = await getPagesUrls(pages[0])
    console.log('Scraping links...OK')
    for (i = 0; i < 3; i++) {
        peopleLinkArr.push(await pages[0]+people[i])
    }
    return peopleLinkArr
}