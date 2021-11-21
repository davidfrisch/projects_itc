class CompareBar {
    constructor(compareBarContainer) {
        this.containerCompaniesToCompare = compareBarContainer
        this.containerButtons = document.createElement('div')
        this.compareButton = this.createCompareButton()
        this.listOfCompaniesToCompare = []

        this.containerCompaniesToCompare.appendChild(this.containerButtons)
        this.containerCompaniesToCompare.appendChild(this.compareButton)

        document.body.addEventListener('keyup', (ev) => {
            if (document.activeElement.tagName != 'INPUT' && ev.key == 'Backspace') {
                this.removeLastElement()
            }
        })
    }

    createCompareButton() {
        const button = document.createElement('button')
        button.classList.add('compare-button')
        button.onclick = () => this.CompareCompanies()
        button.style.visibility = 'hidden'
        return button
    }

    addInContainer(symbol) {
        if (!this.listOfCompaniesToCompare.includes(symbol) && this.listOfCompaniesToCompare.length < 3) {
            this.listOfCompaniesToCompare.push(symbol)

            const newButtonCompanyToCompare = document.createElement('button')
            newButtonCompanyToCompare.setAttribute('id', symbol)
            newButtonCompanyToCompare.classList.add('fa', 'fa-close', 'compare-elem')
            newButtonCompanyToCompare.textContent = ' ' + symbol
            newButtonCompanyToCompare.onclick = (event) => this.removeFromContainer(event)

            this.containerButtons.appendChild(newButtonCompanyToCompare)
            this.updateText()
        }
    }


    removeLastElement() {
        if (this.listOfCompaniesToCompare.length > 0) {
            let removedElem = this.listOfCompaniesToCompare.pop()
            document.getElementById(removedElem).remove()
            this.updateText()
        }
    }

    removeFromContainer(event) {
        let button = event.target
        this.listOfCompaniesToCompare = this.listOfCompaniesToCompare.filter((elem) => elem != button.id)
        button.remove()
        this.updateText()
    }

    updateText() {
        if (this.listOfCompaniesToCompare.length) {
            this.compareButton.style.visibility = 'visible'
            this.compareButton.textContent = 'Compare ' + this.listOfCompaniesToCompare.length
            if (this.listOfCompaniesToCompare.length === 3) {
                this.compareButton.textContent = this.compareButton.textContent + ' (max)'
            }
        } else {
            this.compareButton.style.visibility = 'hidden'
        }
    }

    CompareCompanies() {
        if (this.listOfCompaniesToCompare.length > 0) {
            window.location = `/compare.html?symbol=${this.listOfCompaniesToCompare.toString()}`
        }
    }
}

