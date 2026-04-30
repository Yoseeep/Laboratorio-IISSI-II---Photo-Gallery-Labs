import { sessionManager } from "/js/utils/session.js";

async function main() {
    hideActionsColumn();
}

function hideActionsColumn() {
    let actions_col = document.getElementById("actions-col");
    console.log(sessionManager.isLogged());
    if (!sessionManager.isLogged()) {
        actions_col.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", main);
