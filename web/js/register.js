"use strict";

import { messageRenderer } from "./renderers/messages.js";
import { userValidator } from "./validators/users.js";
import { sessionManager } from "/js/utils/session.js";
import { authAPI_auto } from "./api/_auth.js";


document.addEventListener("DOMContentLoaded", main);
function main() {
  let registerForm = document.getElementById("register-form");
  registerForm.onsubmit = handleSubmitRegister;
}

function handleSubmitRegister(event) {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);

    let errors = userValidator.validateRegister(formData);

    if (errors.length > 0) {
        let errorsDiv = document.getElementById("errors");
        errorsDiv.innerHTML = "";

        for (let error of errors) {
            messageRenderer.showErrorMessage(error);
        }
    } else {
        sendRegister(formData);
    }
}

// async function sendRegister(formData) {
//     try {
//         let loginData = await authAPI_auto.register(formData);
//         console.log(loginData);
//     } catch (err) {
//         messageRenderer.showErrorMessage("Error registering a new user", err);
//     }
// }

async function sendRegister(formData) {
    try {
        let loginData = await authAPI_auto.register(formData);
        console.log(loginData);
        let sessionToken = loginData.sessionToken;
        let loggedUser = loginData.user;

        sessionManager.login(sessionToken, loggedUser);
        window.location.href = "index.html";
    } catch (err) {
        messageRenderer.showErrorMessage("Error registering a new user", err);
    }
}
