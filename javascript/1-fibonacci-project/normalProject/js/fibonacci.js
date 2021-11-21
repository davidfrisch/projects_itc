/**
 * 
 * @param {number} input 
 * @param {dictionary} memo (keep it empty)
 * @returns 
 */

function fibonacciLocalRecursionv2(input, memo = {}) {
    if (input < 0 || input > 50) {
        return -1
    }

    if (memo[input]) {
        return memo[input]
    }

    if (input == 0) {
        return 0
    }

    if (input == 1) {
        return 1
    }

    return memo[input] = fibonacciLocalRecursionv2(input - 1, memo) + fibonacciLocalRecursionv2(input - 2, memo)
}

/**
 * 
 * @param {number} input 
 * @returns fibonacci value
 */
function fibonacciLocalRecursive(input) {
    if (input < 0 || input > 50) {
        return -1
    }

    if (input == 0) {
        return 0
    }

    if (input == 1) {
        return 1
    }

    return fibonacciRecursiveLocal(input - 1) + fibonacciRecursiveLocal(input - 2)
}

/**
 * 
 * @param {number} input 
 * @returns fibonacci value
 */
function fibonacciLocal(input) {

    let num1 = 0
    let num2 = 1
    let output = -1

    if (input > 50 || input < 0) {
        return output
    }

    if (input == 42) {
        return 'Error server: 42 is the meaning of life'
    }

    if (input == 0) {
        return num1
    } else if (input == 1) {
        return num2
    }

    for (let position = num1; position < input - 1; position++) {
        output = num1 + num2
        num1 = num2
        num2 = output
    }

    return output;
}


async function fibonacciServer(input) {
    const FIBONACCI_COMPUTE = FIBONACCI_SERVER + "fibonacci/"

    try {
        const response = await fetch(FIBONACCI_COMPUTE + input)
        if (response.ok) {
            return response.json()
                .then((result) => {
                    return result
                })
                .catch((err) => {
                    console.log(err)
                })

        } else if (response.status == '400') {
            try {
                return response.text()
                    .then((msg) => {
                        return 'Error server: ' + msg
                    })
                    .catch((err_1) => {
                        console.log(err_1)
                    })
            } catch (errorMsg) {
                return errorMsg
            }

        } else {
            throw new Error('Wow something went wrong')
        }
    } catch (err_2) {
        console.log(err_2)
    }

}





