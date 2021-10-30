const PORT = '3000'
const FIBONACCI_SERVER = "http://localhost:"+PORT+"/"


function init() {

    document.getElementById('btn-fibonacci').addEventListener('click', displayFibonacciAnswer)

    document.getElementById('input-fibonacci').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            displayFibonacciAnswer()
        }
    });

  
    addEventListenerForCheckboxFibonacci(document.getElementById('number-asc'), sortByNumberAsc)

    addEventListenerForCheckboxFibonacci(document.getElementById('number-desc'), sortByNumberDesc)

    addEventListenerForCheckboxFibonacci(document.getElementById('date-asc'), sortByDateAsc)

    addEventListenerForCheckboxFibonacci(document.getElementById('date-desc'), sortByDateDesc)


    let checkboxFibonacci = document.getElementById('checkbox-fibonacci')
    document.getElementById('button-checkbox-fibonacci').addEventListener('click', () => {
        checkboxFibonacci.checked = !checkboxFibonacci.checked
    })
    
    displayHistoryFibonacci()
}


init()
