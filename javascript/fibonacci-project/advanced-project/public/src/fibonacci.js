
function fibonacciLocalRecursive(input){
    if(input < 0 || input > 50){
        return -1
    }
    
    if(input == 0){
        return 0
    }

    if(input == 1){
        return 1
    }

    return fibonacciRecursiveLocal(input-1) + fibonacciRecursiveLocal(input-2)
}


function fibonacciLocal(input) {

    let num1 = 0
    let num2 = 1
    let output = -1

    if(input > 50 || input < 0){
        return output
    }

    if(input == 42){
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
    try{
        const response = await fetch(FIBONACCI_COMPUTE + input)
        if(response.ok){
            return await response.json()
        }else if(response.status == '400'){
            return 'Server Error: '+ await response.text()
        }else{
            throw new Error('Status error no handle in FiboServer')
        }
    }catch(err){
        console.log('Error in fibonacciServer calculcation : '+err)
    }
}


module.exports = fibonacciLocal