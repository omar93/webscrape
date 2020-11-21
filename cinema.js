const links = require('./linkScraper')

scrapeCinemaDay()

async function scrapeCinemaDay() {
    let day = await links.getAgreedDay()
    console.log(`Agreed day: ${day}`)
}