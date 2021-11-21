let historyList = {}
let shouldRefresh = true
const REFRESH_HISTORY_TIMER = 10000

async function displayFibonacciAnswer() {
    let inputField = document.getElementById('input-fibonacci')
    let inputValue = inputField.value
    let outputDiv = document.getElementById('output-fibonacci')
    let errorMsgElement = document.getElementById('error-fibonnaci')
    let checkboxElement = document.getElementById('checkbox-fibonacci')
    let spinner = document.getElementById('spinner-fibonacci')

    outputDiv.textContent = ''
    outputDiv.classList.remove('text-danger')

    try {
        if (inputValue) {
            if (inputValue < 1) {
                throw new Error('Can\'t be smaller than 50')
            } else if (inputValue > 50) {
                throw new Error('Can\'t be larger than 50')
            } else {
                if (!Number.isInteger(inputValue)) {
                    inputValue = Math.round(inputValue)
                    inputField.value = inputValue
                }

                outputDiv.textContent = ''
                spinner.classList.remove('d-none')
                spinner.classList.add('d-block')
                if (checkboxElement.checked) {
                    serverResult = await fibonacciServer(inputValue)
                    fiboResult = serverResult.result

                } else {
                    fiboResult = fibonacciLocal(inputValue)
                    if (typeof (fiboResult) == 'number') {
                    } else {
                        displayMeaningOfLife(outputDiv, fiboResult)
                    }
                }

                spinner.classList.add('d-none')


                if (checkboxElement.checked) {
                    if (serverResult.result) {
                        outputDiv.textContent = serverResult.result
                        if (inputValue != 42) {
                            newLineTag = addLineInHistory(serverResult.number, serverResult.result, serverResult.createdDate)
                            newLineTag.classList.add('bg-success', 'text-white', 'bg-opacity-75')
                            window.setTimeout(() => {

                                newLineTag.classList.remove('bg-success', 'text-white', 'bg-opacity-25')
                            }, 1000)
                        }
                    } else {
                        displayMeaningOfLife(outputDiv, serverResult)
                    }
                } else {
                    outputDiv.textContent = fiboResult
                }



            }

        } else {
            throw new Error('Input a number')
        }
    } catch (error) {
        errorMsgElement.textContent = error.message
        inputField.classList.add('border', 'border-danger', 'border-3', 'text-danger')
        errorMsgElement.classList.remove('d-none')
        errorMsgElement.classList.add('d-block')
        window.setTimeout(function () {
            errorMsgElement.classList.add('d-none')
            inputField.classList.remove('border', 'border-danger', 'border-3', 'text-danger')
            inputField.value = null
        }, 1000);
    }


}


function addLineInHistory(number, result, timestamp) {
    let containerHistoryDiv = document.getElementById('history-fibonacci')

    let newLinetag = document.createElement("div")
    newLinetag.classList.add('d-flex', 'flex-wrap')

    let beginTextTag = document.createElement("div")
    beginTextTag.textContent = 'The Fibonacci Of: '


    let numberTag = document.createElement("strong")
    numberTag.classList.add('ps-1', 'pe-1')
    numberTag.textContent = number

    let middleTextTag = document.createElement("div")
    middleTextTag.classList.add('pe-1')
    middleTextTag.textContent = 'is'

    let resultTag = document.createElement("strong")
    resultTag.textContent = result

    let dateTextTag = document.createElement("div")
    dateTextTag.classList.add('pe-1')
    dateTextTag.textContent = '. Calculated at: '

    let timestampTag = document.createElement("div")
    timestampTag.classList.add('pe-1')
    timestampTag.textContent = new Date(timestamp)


    newLinetag.appendChild(beginTextTag)
    newLinetag.appendChild(numberTag)
    newLinetag.appendChild(middleTextTag)
    newLinetag.appendChild(resultTag)
    newLinetag.appendChild(dateTextTag)
    newLinetag.appendChild(timestampTag)
    newLinetag.classList.add('fs-5', 'pb-2', 'pt-2', 'border-bottom', 'border-dark')
    containerHistoryDiv.insertBefore(newLinetag, containerHistoryDiv.children[0])

    return newLinetag

}


setInterval(() => {
    shouldRefresh = true
    //console.log(`${REFRESH_HISTORY_TIMER} seconds past, next time history will refresh`)
}, REFRESH_HISTORY_TIMER)

async function displayHistoryFibonacci(sortAlgorithm = sortByDateDesc) {
    let spinnerHist = document.getElementById('spinner-fibonacciHistory')

    spinnerHist.classList.add('d-block')
    spinnerHist.classList.remove('d-none')
    removeAllChildNodes(document.getElementById('history-fibonacci'))

    if (isDictEmpty(historyList) || shouldRefresh) {
        historyList = await getHistoryFibonacci()
        shouldRefresh = false
    }

    if (historyList) {
        historyList = historyList.sort(sortAlgorithm)
        spinnerHist.classList.add('d-none')
        spinnerHist.classList.remove('d-block')
        for (item in historyList) {
            number = historyList[item]['number']
            result = historyList[item]['result']
            timestamp = historyList[item]['createdDate']
            addLineInHistory(number, result, timestamp)
        }
    } else {

        let errorMsgDisplay = document.createElement("div")
        errorMsgDisplay.classList.add('alert-danger', 'p-3')
        errorMsgDisplay.textContent = 'Not connected to Fibonacci server !'
        document.getElementById('history-fibonacci').appendChild(errorMsgDisplay)

        spinnerHist.classList.add('d-none')

        buttonCheckbox = document.getElementById('button-checkbox-fibonacci')
        buttonCheckbox.disabled = true
        buttonCheckbox.textContent = 'Can\'t ' + buttonCheckbox.textContent + '!'
        buttonCheckbox.classList.remove('ms-4')

        document.getElementById('checkbox-fibonacci').classList.add('d-none')
        document.getElementById('dropdown-fibonacci').remove()
        document.getElementById('error-fibonnaci').classList.remove('ms-4')
    }
}

async function getHistoryFibonacci() {
    const FIBONACCI_HISTORY = FIBONACCI_SERVER + 'getFibonacciResults/'

    try {
        const response = await fetch(FIBONACCI_HISTORY)
        if (response.ok) {
            const historyCollection = await response.json()
            return historyCollection['results']
        } else {
            throw new Error('Something went wrong in fibo history response')
        }
    } catch (err) {
        console.log(err)
    }

}
