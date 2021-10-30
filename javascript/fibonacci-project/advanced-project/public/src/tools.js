/** 
    Functions for sorting the fibonacci history
**/
function sortByNumberAsc(elem1, elem2) {
    return elem2.number - elem1.number
}

function sortByNumberDesc(elem1, elem2) {
    return elem1.number - elem2.number
}

function sortByDateAsc(elem1, elem2) {
    return elem2.createdDate - elem1.createdDate
}

function sortByDateDesc(elem1, elem2) {
    return elem1.createdDate - elem2.createdDate
}


function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function isDictEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function addEventListenerForCheckboxFibonacci(selectedTag, sortAlg) {
    selectedTag.addEventListener('click', () => {
        //replace last-selected class
        lastSelectedTag = document.querySelector('.last-selected')
        lastSelectedTag.textContent = lastSelectedTag.textContent.replace(' ✓', '')
        lastSelectedTag.classList.remove('last-selected')

        selectedTag.classList.add('last-selected')
        selectedTag.textContent += ' ✓'
        displayHistoryFibonacci(sortAlg)
    })

}

function displayMeaningOfLife(tag, message) {
    tag.textContent = message
    tag.classList.add('text-danger')
}

