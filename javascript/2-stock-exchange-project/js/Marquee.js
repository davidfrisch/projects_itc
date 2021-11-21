const URLforMarquee = 'https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/nyse'
const lengthElementsInMaquee = 20
import { setStockPriceChange } from './tools.js'
class Marquee {
    constructor(divMarqueeContainer) {
        this.divMarqueeContainer = divMarqueeContainer
        this.divMarqueeElements = document.createElement('div')
        this.divMarqueeElements.classList.add('marquee-elem-container')

        this.divMarqueeContainer.appendChild(this.createTopSpaceShip())
        this.divMarqueeContainer.appendChild(this.divMarqueeElements)
        this.divMarqueeContainer.appendChild(this.createBottomSpaceShip())
    }

    createTopSpaceShip() {
        let topSpaceShip = document.createElement('img')
        topSpaceShip.classList.add('top-rocket')
        topSpaceShip.src = '../res/head_rocket.png'
        return topSpaceShip
    }

    createBottomSpaceShip() {
        let bottomSpaceShip = document.createElement('img')
        bottomSpaceShip.classList.add('top-rocket')
        bottomSpaceShip.src = '../res/bottom_rocket.png'
        return bottomSpaceShip
    }

    load() {
        Marquee.getMarqueeStock(URLforMarquee)
            .then((companies) => {
                for (let i = 0; i < lengthElementsInMaquee; i++) {
                    this.addStockMarquee(companies[i])
                }
            })
            .catch((err) => console.log(err))
    }

    addStockMarquee(company) {
        const divSingleMarquee = document.createElement('div')
        const symbolSpan = document.createElement('span')
        const stockPercentageSpan = document.createElement('span')

        divSingleMarquee.classList.add('marquee-elem')
        stockPercentageSpan.classList.add('marquee-percentage')

        symbolSpan.textContent = company.symbol
        setStockPriceChange(stockPercentageSpan, company.changesPercentage)

        divSingleMarquee.appendChild(symbolSpan)
        divSingleMarquee.appendChild(stockPercentageSpan)
        this.divMarqueeElements.appendChild(divSingleMarquee)
    }

    static async getMarqueeStock(url) {
        return await (await fetch(url)).json()
    }


}

export default Marquee