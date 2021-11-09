
function setStockPriceChange(tagChangeValue, changeValue) {
    let isPositive = changeValue >= 0
    tagChangeValue.textContent = `(${(isPositive ? '+' : '')}${parseFloat(changeValue).toFixed(2)} %)`
    tagChangeValue.style.color = isPositive ? 'green' : 'red'
    return tagChangeValue
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function highlightMatchText(searchText, HTMLElementWithText) {
    const regex = new RegExp(searchText, 'gi');
    let text = HTMLElementWithText.innerHTML;
    text = text.replace(/(<mark class="highlight">|<\/mark>)/gim, '');
    const newText = text.replace(regex, '<mark class="highlight">$&</mark>');
    HTMLElementWithText.innerHTML = newText
}

export { setStockPriceChange, removeAllChildNodes, highlightMatchText }