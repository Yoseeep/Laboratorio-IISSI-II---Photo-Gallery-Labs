"use strict";

import { photoRenderer } from "/web/js/renderers/photos.js";
import { PhotosAPI_auto } from "/web/js/api/_Photos.js";
import { PhotosWithUsersAPI_auto } from "/js/api/_PhotosWithUsers.js";
import { messageRenderer } from "/web/js/renderers/messages.js";

let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");

function main() {
  if (photoId === null) { 
    messageRenderer.showErrorMessage("Please, provide a photoId");
    return;
  }

  let deleteButton = document.querySelector("#button-delete");
  deleteButton.onclick = handleDelete;

  let editButton = document.querySelector("#button-edit");
  editButton.onclick = handleEdit;

  loadPhotoDetails();
}

async function handleDelete(event) {
  let answer = confirm("Do you really want to delete this photo?");

  if (answer) {
    try {
      await PhotosAPI_auto.delete(photoId);
      window.location = "/index.html";
    } catch (err) {
      messageRenderer.showErrorMessage(err.response.data.message);
    }
  }
}

function handleEdit(event) {
    window.location.href = "edit_photo.html?photoId=" + photoId;
}

async function loadPhotoDetails() {
  let photoContainer = document.querySelector("#photo-details-column");
  try {
    let photo = await PhotosAPI_auto.getById(photoId);
    // let photo = await PhotosWithUsersAPI_auto.getAll().filter(p => p.PhotoId === photoId)[0];
    console.log(photo);
    // let photoDetails = photoRenderer.asDetails(photo);
    let photoDetails = photoRenderer.asDetails(photo);
    photoContainer.appendChild(photoDetails);
  } catch (err) {
    messageRenderer.showErrorMessage("Error loading photo", err);
  }
}

document.addEventListener("DOMContentLoaded", main);
