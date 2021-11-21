class CompanyInfo {
    static idCounter = 0

    constructor(companiesInfoContainer, symbol) {
        this.companiesInfoContainer = companiesInfoContainer
        this.symbol = symbol
        this.id = CompanyInfo.idCounter++

        this.singleCompanyContainer = document.createElement('div')
        this.singleCompanyContainer.classList.add('single-company-container')
        this.graphCompany
        this.historyStockValue

        this.companiesInfoContainer.appendChild(this.singleCompanyContainer)
    }

    async load() {
        try {
            //get and set company profile
            let companyProfile = await StockExchangeAPI.getCompanyProfile(this.symbol)
            companyProfile.symbol = this.symbol
            const radioButtons = this.createRadioButtons(this)

            this.createProfile(companyProfile)
            await this.createGraph(radioButtons)
            this.createDescription(companyProfile)
        } catch (error) {
            console.log(error)
        }
    }

    createSingleRadioButton(index, id, periodList) {
        const singleRadioButton = document.createElement('p')
        const label = document.createElement('label')
        const input = document.createElement('input')
        const span = document.createElement('span')

        //styling elements
        input.classList.add('form-check-input')
        label.classList.add('d-flex', 'flex-column', 'align-items-center', 'form-check-label')
        singleRadioButton.classList.add('me-3')


        //setting radio button
        span.textContent = periodList[index]
        input.name = "time-scale-" + id
        input.value = periodList[index].replace(' ', '-') + '-' + id
        input.type = "radio"

        if (index === '0') input.checked = true

        //append radio in the form
        label.appendChild(input)
        label.appendChild(span)
        singleRadioButton.appendChild(label)

        return singleRadioButton
    }

    createRadioButtons(context) {
        const periodList = ['1 month', '6 months', '1 year', '5 years', 'max']
        const form = document.createElement('form')
        form.classList.add('d-flex', `form-${this.id}`)

        for (let i in periodList) {
            form.appendChild(this.createSingleRadioButton(i, this.id, periodList))
        }
        form.addEventListener('change', this.addChart.bind(context))
        return form
    }

    createDescription(companyProfile) {
        const containerDescriptionCompany = document.createElement('div')
        containerDescriptionCompany.classList.add('company-description')

        //title description
        const titleDescriptionCompany = document.createElement('div')
        titleDescriptionCompany.textContent = `About ${companyProfile.companyName}:`
        titleDescriptionCompany.classList.add('title-description')

        //text description
        const textDescriptionCompany = document.createElement('div')
        textDescriptionCompany.textContent = companyProfile.description
        textDescriptionCompany.classList.add('text-description')

        //append containers
        containerDescriptionCompany.appendChild(titleDescriptionCompany)
        containerDescriptionCompany.appendChild(textDescriptionCompany)
        this.singleCompanyContainer.appendChild(containerDescriptionCompany)
    }

    createContainerNameAndSymbol(containerProfile, companyProfile) {
        const divNameAndSymbol = document.createElement('div')
        const companyName = document.createElement('span')
        const companySymbol = document.createElement('span')

        //set name and symbol
        companyName.textContent = companyProfile.companyName
        companySymbol.textContent = companyProfile.symbol
        companyName.classList.add('country-title')
        companySymbol.classList.add('country-symbol')
        divNameAndSymbol.classList.add('divNameAndSymbol')
        divNameAndSymbol.appendChild(companyName)
        divNameAndSymbol.appendChild(companySymbol)

        containerProfile.appendChild(divNameAndSymbol)
        containerProfile.appendChild(divNameAndSymbol)
    }

    createCountryContainer(containerProfile, companyProfile) {
        const divCountry = document.createElement('div')
        const countryTitle = document.createElement('span')
        const countryCompany = document.createElement('span')
        const countryFlag = document.createElement('img')

        //set country and flag
        countryTitle.textContent = 'Originally from'
        countryCompany.textContent = companyProfile.country
        countryFlag.src = `https://flagcdn.com/24x18/${companyProfile.country.toLowerCase()}.png`
        countryFlag.classList.add('country-flag', 'ms-2')
        divCountry.classList.add('divCountry')
        countryCompany.appendChild(countryFlag)
        divCountry.appendChild(countryTitle)
        divCountry.appendChild(countryCompany)

        containerProfile.appendChild(divCountry)
    }

    createSectorContainer(containerProfile, companyProfile) {
        const divSector = document.createElement('div')
        const sectorTitle = document.createElement('span')
        const sectorCompany = document.createElement('span')

        //set sector
        sectorTitle.textContent = 'Sector'
        sectorCompany.textContent = companyProfile.sector
        divSector.classList.add('divSector')
        divSector.appendChild(sectorTitle)
        divSector.appendChild(sectorCompany)

        containerProfile.appendChild(divSector)
    }

    createLogoContainer(containerProfile, companyProfile) {
        const divCompanyLogo = document.createElement('div')
        const companyLogo = document.createElement('img')

        //set logo
        companyLogo.onerror = () => {
            companyLogo.src = '../res/stockRocket_logo.png'
        }
        companyLogo.classList.add('company-logo')
        divCompanyLogo.classList.add('container-company-logo')
        companyLogo.src = companyProfile.image
        divCompanyLogo.appendChild(companyLogo)

        containerProfile.appendChild(divCompanyLogo)
    }

    createProfile(companyProfile) {
        //creating the elements
        const containerProfile = document.createElement('div')
        containerProfile.classList.add('container-profile')

        this.createContainerNameAndSymbol(containerProfile, companyProfile)
        this.createCountryContainer(containerProfile, companyProfile)
        this.createSectorContainer(containerProfile, companyProfile)
        this.createLogoContainer(containerProfile, companyProfile)
        this.singleCompanyContainer.appendChild(containerProfile)
    }

    async createGraph(radioButtons = null) {
        //get and set company history stock value
        let companyHistorical = await StockExchangeAPI.getCompanyHistory(this.symbol)
        this.historyStockValue = companyHistorical.reverse()
        this.containerGraph = document.createElement('div')
        this.containerGraph.classList.add('company-graph-container')

        this.canvasGraph = document.createElement('canvas')
        this.canvasGraph.setAttribute('id', `company-graph-${this.id}`)
        this.containerGraph.appendChild(this.canvasGraph)
        if (radioButtons) this.containerGraph.appendChild(radioButtons)
        this.singleCompanyContainer.appendChild(this.containerGraph)
        this.addChart()
    }

    setDatesHistory(timeScale = null) {
        const scaleHistory = [...this.historyStockValue]
        const MAX_EPOCH = 400
        const oneYear = -360
        const oneMonth = -30
        const MIN = 5
        const MAX = 10


        switch (timeScale) {
            case '1-month-' + this.id:
                return scaleHistory.slice(oneMonth)
            case '6-months-' + this.id:
                return scaleHistory.slice(6 * oneMonth)
            case '1-year-' + this.id:
                return scaleHistory.slice(oneYear)
            case '5-years-' + this.id:
                return scaleHistory.slice(5 * oneYear)
            case 'max-' + this.id:
                //remove random values to lighter the graph
                while (scaleHistory.length > MAX_EPOCH) {
                    let removedValue = Math.floor(Math.random() * scaleHistory.length)
                    if (MIN < removedValue < scaleHistory.length - MAX) {

                        scaleHistory.splice(removedValue, 1)
                    }
                }
                return scaleHistory
        }
    }

    addChart() {
        let timeScale
        try {
            timeScale = document.querySelector(`input[name="time-scale-${this.id}"]:checked`).value
        } catch (error) {
            timeScale = 'max-' + this.id
        }
        const historyScaled = this.setDatesHistory(timeScale)

        const ctx = document.getElementById(`company-graph-${this.id}`).getContext("2d")

        if (this.graphCompany) {
            this.graphCompany.destroy()
        }

        this.graphCompany = new Chart(ctx, {
            type: 'line',
            data: {
                labels: historyScaled.map(elem => elem.date.day + '-' + elem.date.month + '-' + elem.date.year),
                datasets: [{
                    label: 'Value in $',
                    data: historyScaled.map(elem => elem.close),
                    fill: true,
                }]
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,
                events: ["mouseout", "click", "touchstart", "touchmove", "touchend"],
            }
        }
        )

    }


}





