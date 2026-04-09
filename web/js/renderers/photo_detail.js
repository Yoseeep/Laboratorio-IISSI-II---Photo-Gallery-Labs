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

  loadPhotoDetails();}

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
