
class CompareCompanies {
    constructor(containerPage, listOfCompanies) {
        this.listOfCompanies = listOfCompanies.split(',')
        this.containerPage = containerPage
        this.companiesContainer = document.createElement('div')
        this.companiesContainer.classList.add('companies-container')
        this.progressBar = this.createProgressBar()

        this.containerPage.appendChild(this.progressBar)
        this.containerPage.appendChild(this.companiesContainer)
        this.companiesContainer.style.visibility = 'hidden'
        for (let index in this.listOfCompanies) {
            this.addCompanyProfile(index, this)
        }
        setTimeout(() => {
            this.progressBar.style.display = 'none'
            this.companiesContainer.style.visibility = 'visible'
        }, 4000)

    }

    addCompanyProfile(index, context) {
        let newCompany = new CompanyInfo(context.companiesContainer, context.listOfCompanies[index])
        newCompany.load()
        return newCompany
    }

    createProgressBar() {
        const progressBarImage = document.createElement('img')
        progressBarImage.setAttribute('id', 'progress-image')
        progressBarImage.src = '../res/rocket_loading3.gif'

        const progressBarText = document.createElement('h2')
        progressBarText.textContent = 'Loading...'

        const containerProgressBar = document.createElement('div')
        containerProgressBar.appendChild(progressBarImage)
        containerProgressBar.appendChild(progressBarText)
        containerProgressBar.classList.add('container-progress')
        //containerProgressBar.style.display = 'none'

        return containerProgressBar
    }

}