class StockExchangeAPI {

    static async findCompanyMatch(companyName) {
        const URL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${companyName}&limit=10&exchange=NASDAQ`
        try {
            return await (await fetch(URL)).json()
        } catch (error) {
            console.log('Error in findCompanyMatch fn ' + error)
        }
    }

    static async getCompanyProfile(symbol) {
        const URL = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/"
        try {
            const response = await (await fetch(URL + symbol)).json()
            return response['profile']
        } catch (error) {
            console.log('Error in getCompanyProfile fn ' + error)
        }
    }

    static async getCompanyHistory(symbol) {
        const URL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`
        const response = await (await fetch(URL)).json()
        let historical = response['historical']
        historical = historical.map((elem) => {
            let date = elem.date.split('-')
            return {
                'close': elem.close,
                'date': {
                    'year': date[0],
                    'month': date[1],
                    'day': date[2]
                }
            }
        })
        return historical
    }
}