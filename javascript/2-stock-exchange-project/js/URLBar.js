class URLBar {
    constructor() {
        this.observers = []
    }

    addObserver(o) {
        this.observers.push(o)
    }

    notifyObservers() {
        if (URLBar.getQuery() != '') {
            for (let observer of this.observers) {
                observer.update(URLBar.getQuery())
            }
        }
    }

    update(inputSearchField) {
        window.history.replaceState({ symbol: URLBar.getQuery() }, '', `?symbol=${inputSearchField.value}`);
    }

    static getQuery() {
        return new URLSearchParams(window.location.search).get('symbol')
    }

    static getQueryMaxElem(maxNumberElements) {
        let symbols = new URLSearchParams(window.location.search).get('symbol')
        let result = symbols
        let listSymbols = symbols.split(',')

        if (listSymbols.length > maxNumberElements) {
            result = ''
            for (let i = 0; i < maxNumberElements; i++) {
                result += listSymbols[i]
                if (i != maxNumberElements - 1) result += ','
            }
        }

        //In case there are more than 3 elements
        window.history.replaceState({ symbol: URLBar.getQuery() }, '', `?symbol=${result}`);

        return result
    }
}

