//add Listener to each require field 
//Such that enables submit button when conditions are filled
['first-name','comment','email'].forEach(element => {
    let anInput = document.forms["contact-form"][element];
    anInput.addEventListener("change", CheckStatusSubmitButton);
}); 

function CheckStatusSubmitButton(){
    if (isNameHasText() && isEmailValid() && isCommentHasText()){
        activateSubmitButton()
    }else{
        disableSubmitButton()
    }
}

//check inputs fields are correct
function activateSubmitButton(){
    submitButton = document.forms["contact-form"]['button-contact-submit']
    submitButton.className = 'button-contact-submit-activate'
    submitButton.disabled = false;
}

function disableSubmitButton(){
    submitButton = document.forms["contact-form"]['button-contact-submit']
    submitButton.className = 'button-contact-submit-disable'
    submitButton.disabled = true;
}


function isNameHasText(){
    nameField = document.forms["contact-form"]["first-name"]
    return 0 < nameField.value.length && nameField.value.length < 48
}

function isEmailValid(){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    emailField = document.forms["contact-form"]["email"]
    return re.test(String(emailField.value).toLowerCase());
}

function isCommentHasText(){
    commentField = document.forms["contact-form"]["comment"]
    return commentField.value.length > 0
}

