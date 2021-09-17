const footer = document.getElementById('h3-footer')
const codingLanguages = ["HTML", "CSS", "JavaScript", "Python", "Java", "C++"]

for(let i=0; i < codingLanguages.length-1 ; i++){
    footer.textContent += " "+ codingLanguages[i]
}
if (codingLanguages.length > 1){
    footer.textContent += " and "+ codingLanguages[codingLanguages.length-1]
}

