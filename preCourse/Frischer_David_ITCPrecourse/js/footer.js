const footer = document.getElementById('h3-footer')
//const codingLanguages = ["HTML", "CSS", "JavaScript", "Python", "Java", "C++"]
const codingLanguages = ["HTML", "CSS"]
//const codingLanguages = ["HTML"]


if (codingLanguages.length > 1){
for(let i=0; i < codingLanguages.length-1 ; i++){
    footer.textContent += " "+ codingLanguages[i]
}
footer.textContent += " and "+ codingLanguages[codingLanguages.length-1]
}else{
    footer.textContent += " "+codingLanguages[0]
}

