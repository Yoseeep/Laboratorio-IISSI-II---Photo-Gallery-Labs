"use strict";

import { photoRenderer } from "/web/js/renderers/photos.js";

function main() {
    let photoContainer = document.getElementById("photo-details-column");

    let photo = {
        title: "Samoyed",
        description: "A very good boy.",
        userId: 1,
        url: "https://static.vecteezy.com/system/resources/previews/023/193/490/non_2x/illustration-of-cute-little-baby-penguin-isolated-on-white-animal-clipart-in-flat-style-vector.jpg",
        date: "12/01/1996",
    };

    let photoDetails = photoRenderer.asDetails(photo);
    photoContainer.appendChild(photoDetails);
}

document.addEventListener("DOMContentLoaded", main);
