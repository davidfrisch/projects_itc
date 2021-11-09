import { setStockPriceChange, removeAllChildNodes, highlightMatchText } from './tools.js'

class SearchResult {
    constructor(containerResult) {
        this.compareBar;
        this.containerResult = containerResult
        this.containerResult.style.display = 'none'

        this.containerCompanies = document.createElement('div')
        this.containerProgressBar = this.createProgressBar()

        this.containerResult.appendChild(this.containerProgressBar)
        this.containerResult.appendChild(this.containerCompanies)
    }

    createProgressBar() {
        const progressBarImage = document.createElement('img')
        progressBarImage.setAttribute('id', 'progress-image')
        progressBarImage.src = '../res/loading_spaceship.gif'

        const containerProgressBar = document.createElement('div')
        containerProgressBar.appendChild(progressBarImage)
        containerProgressBar.classList.add('container-progress')
        containerProgressBar.style.display = 'none'

        return containerProgressBar
    }



    createCompanyLogoDiv(companyProfile) {
        const companyLogo = document.createElement('img')
        companyLogo.onerror = () => {
            companyLogo.src = '../res/stockRocket_logo.png'
        }
        companyLogo.classList.add('company-logo')
        companyLogo.src = companyProfile.image

        return companyLogo
    }

    //Company Link is the company name attached to a link to see profile page
    createCompanyLinkDiv(company, inputSearch) {
        const companyLinkDiv = document.createElement('a')
        companyLinkDiv.classList.add('title-result')
        companyLinkDiv.href = `/company.html?symbol=${company.symbol}`
        companyLinkDiv.innerHTML = `${company.name} `
        highlightMatchText(inputSearch, companyLinkDiv)
        return companyLinkDiv
    }

    //InfoDiv contains information about symbol and percentage of the company
    createCompanyInfoDiv(company, companyProfile, inputSearch) {
        const companyInfoDiv = document.createElement('div')
        companyInfoDiv.classList.add('company-info-div')
        const companySymbol = document.createElement('span')
        companySymbol.textContent = `(${company.symbol}) `
        highlightMatchText(inputSearch, companySymbol)

        companyInfoDiv.appendChild(companySymbol)
        companyInfoDiv.appendChild(setStockPriceChange(document.createElement('span'), companyProfile.changesPercentage))

        return companyInfoDiv
    }



    async createNewRow(company, inputSearch = null) {
        return await StockExchangeAPI.getCompanyProfile(company.symbol)
            .then((companyProfile) => {
                if (companyProfile) {
                    const DivRowCompany = document.createElement('div')
                    DivRowCompany.classList.add('div-company-row')

                    DivRowCompany.appendChild(this.createCompanyLogoDiv(companyProfile))
                    DivRowCompany.appendChild(this.createCompanyLinkDiv(company, inputSearch))
                    DivRowCompany.appendChild(this.createCompanyInfoDiv(company, companyProfile, inputSearch))
                    if (this.compareBar) DivRowCompany.appendChild(this.createButtonCompare(this, company))

                    return DivRowCompany
                }
                return null
            })
            .catch(err => console.log(err))
    }



    renderResults(inputSearch) {
        //reset containers style for new research 
        this.containerCompanies.textContent = ''
        this.containerCompanies.style.display = 'none'
        this.containerProgressBar.style.display = 'block'
        this.containerResult.style.display = 'block'
        removeAllChildNodes(this.containerCompanies)
        window.scrollBy(0, document.body.scrollHeight)

        StockExchangeAPI.findCompanyMatch(inputSearch)
            .then((foundCompanies) => {
                if (foundCompanies.length != 0) {
                    for (let company of foundCompanies) {
                        this.createNewRow(company, inputSearch)
                            .then((DivRowCompany) => {
                                if (DivRowCompany) {
                                    this.containerCompanies.appendChild(DivRowCompany)
                                }
                            })
                    }

                    //auto-scroll for UX
                    setTimeout(() => {
                        this.containerCompanies.style.display = 'block'
                        this.containerProgressBar.style.display = 'none'
                        window.scrollBy(0, document.body.scrollHeight)
                    }, 2000)
                } else {
                    this.containerProgressBar.style.display = 'none'
                    this.containerCompanies.style.display = 'block'
                    this.containerCompanies.textContent = 'No companies found !'
                }
            })
            .catch((err) => console.log(err))
    }

    //Compare bar shows which companies will be compared
    setCompareBar(compareBar) {
        this.compareBar = compareBar
    }

    //Button to add Company in the Compare bar
    createButtonCompare(context, company) {
        const buttonCompare = document.createElement('button')
        buttonCompare.classList.add('compare-button')
        buttonCompare.textContent = 'Compare'
        buttonCompare.onclick = () => { if (context.compareBar) context.compareBar.addInContainer(company.symbol) }
        buttonCompare.company = company

        return buttonCompare
    }
}

export default SearchResult