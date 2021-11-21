/* Write a program that accepts one or more numbers as command-line arguments  
  and prints the sum of those numbers to the console (stdout).   */

let linputUser = 0


for(i=2; i < process.argv.length; i++){
    inputUser += Number(process.argv[i])
}
console.log(inputUser)