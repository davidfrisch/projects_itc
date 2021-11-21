class SearchForm {
    constructor(searchFormContainer) {
        this.searchFormContainer = searchFormContainer
        this.searchInput = this.createSearchInput(this)
        this.searchButton = this.createSearchButton(this)
        this.renderResults;
        this.observers = []

        searchFormContainer.appendChild(this.searchInput)
        //searchFormContainer.appendChild(this.searchButton)
    }

    createSearchButton(context) {
        const searchButtonElement = document.createElement('button')
        searchButtonElement.addEventListener('click', context.onSearch.bind(context))
        searchButtonElement.textContent = 'Search !'
        return searchButtonElement
    }

    createSearchInput(context) {
        const searchInputElement = document.createElement('input')

        searchInputElement.setAttribute('id', 'search-input-form')
        searchInputElement.type = 'text'
        searchInputElement.placeholder = 'Insert Company Name'

        searchInputElement.addEventListener('keyup', context.debounce(context.onSearch.bind(context), 1000))
        searchInputElement.addEventListener('keyup', context.notifyObservers.bind(context))
        return searchInputElement
    }

    addObserver(o) {
        this.observers.push(o)
    }

    notifyObservers() {
        for (let obersever of this.observers) {
            obersever.update(this.searchInput)
        }
    }

    update(queryText) {
        this.searchInput.value = queryText
        this.onSearch()
    }

    onSearch(setRenderResults) {
        if (!this.renderResults) {
            this.renderResults = setRenderResults
        }

        if (this.renderResults && this.searchInput.value) {
            this.renderResults(this.searchInput.value)
        }
    }

    debounce(func, delay) {
        let debouncerTime;

        return function () {
            const context = this
            const args = arguments
            clearTimeout(debouncerTime)
            debouncerTime = setTimeout(() => func(context, args), delay)
        }

    }
}