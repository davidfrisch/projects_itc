//add Listener to each require field 
//Such that enables submit button when conditions are filled
['first-name', 'comment', 'email'].forEach(element => {
    let anInput = document.forms["contact-form"][element];
    anInput.addEventListener("change", CheckStatusSubmitButton);
});

function CheckStatusSubmitButton() {
    a = isNameHasText() 
    b = isEmailValid()
    c = isCommentHasText()
    if (a && b && c) {
        activateSubmitButton()
    } else {
        disableSubmitButton()
    }
}

//check inputs fields are correct
function activateSubmitButton() {
    submitButton = document.forms["contact-form"]['button-contact-submit']
    submitButton.className = 'button-contact-submit-activate'
    submitButton.disabled = false;
}

function disableSubmitButton() {
    submitButton = document.forms["contact-form"]['button-contact-submit']
    submitButton.className = 'button-contact-submit-disable'
    submitButton.disabled = true;
}


function isNameHasText() {
    nameField = document.forms["contact-form"]["first-name"]
    if (0 < nameField.value.length && nameField.value.length < 48) {
        nameField.style.border = "greenyellow solid 3px"
        return true
    }
    nameField.style.border = "red solid 3px"
    return false
}

function isEmailValid() {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    emailField = document.forms["contact-form"]["email"]
    if (re.test(String(emailField.value).toLowerCase())) {
        emailField.style.border = "greenyellow solid 3px"
        return true
    }
    emailField.style.border = "red solid 3px"
    return false
}

function isCommentHasText() {
    commentField = document.forms["contact-form"]["comment"]
    if(commentField.value.length > 0){
        commentField.style.border = "greenyellow solid 3px"
        return true
    }
    commentField.style.border = "red solid 3px"
    return false
}

