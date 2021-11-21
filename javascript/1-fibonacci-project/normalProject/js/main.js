const PORT = '5050'
const FIBONACCI_SERVER = "http://localhost:" + PORT + "/"

/**
 * Init the following elements
 * - button to compute fibo value
 * - press 'enter' to compute the fibo value
 * - checkbox value to save it or not in the server
 * - buttons for sort the history fibonacci from the server
 * - Display the history fibonacci from the server on the index.html page
 */
function init() {
    document.getElementById('btn-fibonacci').addEventListener('click', displayFibonacciAnswer)

    document.getElementById('input-fibonacci').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            displayFibonacciAnswer()
        }
    });

    let checkboxFibonacci = document.getElementById('checkbox-fibonacci')
    document.getElementById('button-checkbox-fibonacci').addEventListener('click', () => {
        checkboxFibonacci.checked = !checkboxFibonacci.checked
    })


    addEventListenerForCheckboxFibonacci(document.getElementById('number-asc'), sortByNumberAsc)

    addEventListenerForCheckboxFibonacci(document.getElementById('number-desc'), sortByNumberDesc)

    addEventListenerForCheckboxFibonacci(document.getElementById('date-asc'), sortByDateAsc)

    addEventListenerForCheckboxFibonacci(document.getElementById('date-desc'), sortByDateDesc)

    displayHistoryFibonacci()
}


init()
