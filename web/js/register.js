"use strict";

import { messageRenderer } from "./renderers/messages.js";
import { userValidator } from "./validators/users.js";

document.addEventListener("DOMContentLoaded", main);
function main() {
  let registerForm = document.getElementById("register-form");
  registerForm.onsubmit = handleSubmitRegister;
}

function handleSubmitRegister(event) {
  let form = event.target;
  let formData = new FormData(form);

  let errors = userValidator.validateRegister(formData);

  if (errors.length > 0) {
    event.preventDefault();
    let errorsDiv = document.getElementById("errors");
    errorsDiv.innerHTML = "";

    for (let error of errors) {
      messageRenderer.showErrorMessage(error);
    }
  }
}
