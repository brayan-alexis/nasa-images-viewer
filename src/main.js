// const NasaUrl = 'https://images-api.nasa.gov/search?q=hubble&media_type=image&page_size=5' // 5 images

const NASA_API_URL = 'https://images-api.nasa.gov/' 
const nasaImage1 = document.querySelector(".nasa-image-1");
const nasaImage2 = document.querySelector(".nasa-image-2");
const nasaImage3 = document.querySelector(".nasa-image-3");

// Function to fetch a random NASA image
const fetchNasaImages = async () => {
    try {
        const response = await fetch(`${NASA_API_URL}search?q=hubble&media_type=image`);
        const data = await response.json();
        console.log(data); // Check the console to see the data object
        return data.collection.items; // Return the array of images
    } catch (err) {
        console.log(err);
        return []; // Return an empty array in case of error
    }
}

// Function to display NASA images
const displayRandomImages = async () => {
    const images = await fetchNasaImages();

    if (images.length > 0) {
        const randomImage1 = images[Math.floor(Math.random() * images.length)];
        const randomImage2 = images[Math.floor(Math.random() * images.length)];
        const randomImage3 = images[Math.floor(Math.random() * images.length)];
        console.log(randomImage1); // Check the console to see the data
        console.log(randomImage2);
        console.log(randomImage3);

        // Get image URLs
        const imageUrl1 = randomImage1.links[0].href;
        const imageUrl2 = randomImage2.links[0].href;
        const imageUrl3 = randomImage3.links[0].href;
        // Set image sources
        nasaImage1.src = imageUrl1;
        nasaImage2.src = imageUrl2;
        nasaImage3.src = imageUrl3;

        // Id
        const id1 = randomImage1.data[0].nasa_id;
        const id2 = randomImage2.data[0].nasa_id;
        const id3 = randomImage3.data[0].nasa_id;
        nasaImage1.id = id1;
        nasaImage2.id = id2;
        nasaImage3.id = id3;

        // Title
        const title1 = randomImage1.data[0].title;
        const title2 = randomImage2.data[0].title;
        const title3 = randomImage3.data[0].title;
        nasaImage1.title = title1;
        nasaImage2.title = title2;
        nasaImage3.title = title3;

        // Description
        const description1 = randomImage1.data[0].description;
        const description2 = randomImage2.data[0].description;
        const description3 = randomImage3.data[0].description;
        // Get the index of the first dot
        const firstDotIndex1 = description1.indexOf("."); 
        const firstDotIndex2 = description2.indexOf(".");
        const firstDotIndex3 = description3.indexOf(".");
        // Trim the description to the first dot
        const trimmedDescription1 = description1.substring(0, firstDotIndex1 !== -1 ? firstDotIndex1 + 1 : 300);
        const trimmedDescription2 = description2.substring(0, firstDotIndex2 !== -1 ? firstDotIndex2 + 1 : 300);
        const trimmedDescription3 = description3.substring(0, firstDotIndex3 !== -1 ? firstDotIndex3 + 1 : 300);
        // Add a dot at the end if there isn't one
        const finalDescription1 = trimmedDescription1.endsWith(".") ? trimmedDescription1 : trimmedDescription1 + ".";
        const finalDescription2 = trimmedDescription2.endsWith(".") ? trimmedDescription2 : trimmedDescription2 + ".";
        const finalDescription3 = trimmedDescription3.endsWith(".") ? trimmedDescription3 : trimmedDescription3 + ".";
        // Set the description
        nasaImage1.description = finalDescription1; 
        nasaImage2.description = finalDescription2;
        nasaImage3.description = finalDescription3;

        // Date
        const date1 = randomImage1.data[0].date_created;
        const date2 = randomImage2.data[0].date_created;
        const date3 = randomImage3.data[0].date_created;
        nasaImage1.date = date1;
        nasaImage2.date = date2;
        nasaImage3.date = date3;
    } else {
        console.log("No images available.");
    }
}
// Call the function to display NASA images
displayRandomImages();
// window.onload = displayRandomImages;


// Obtaining a random image by clicking the button
const newImage = document.getElementById("refresh-button");
// newImage.addEventListener("click", fetchNasaImage);
newImage.addEventListener("click", displayRandomImages);

// Add to favorites by clicking the image
nasaImage1.addEventListener("click", () => addToFavorites(nasaImage1.id));
nasaImage2.addEventListener("click", () => addToFavorites(nasaImage2.id));
nasaImage3.addEventListener("click", () => addToFavorites(nasaImage3.id));

// Function to display favorite images
const addToFavorites = async (imageId) => {
    const image = await document.getElementById(imageId);
    console.log(image);

    // Check if the page contains dark mode
    let darkMode = false;
    if (body.classList.contains("dark-mode")) {
        darkMode = true;
    }

    //Sweet Alert 2: Show image title and description in a modal and ask for confirmation to add to favorites
    Swal.fire({
        title: image.title,
        text: image.description ? image.description : "No description available.",
        // html: `${image.description}<br><br><i>${image.date}</i>`, // Add description and date
        imageUrl: image.src,
        imageAlt: image.title,
        imageHeight: 300,
        confirmButtonText: "Add to favorites",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        color: darkMode ? "#121212" : "#DDDDDD",
        background: darkMode ? "#DDDDDD" : "#121212",
        reverseButtons: true,
        focusConfirm: false,
        focusCancel: true,
        // confirmButtonColor: "#3085d6",
        confirmButtonColor: "#1565c0",
        cancelButtonColor: "#d33",
        allowOutsideClick: true,
        allowEscapeKey: true,
        allowEnterKey: false,
        stopKeydownPropagation: false,
        showCloseButton: true,
        closeButtonAriaLabel: "Close this dialog window",
    }).then((result) => {
        if (result.isConfirmed) {
            // Check if the image is already in favorites
            const favoriteImages = document.querySelectorAll(".favorite-image");
            for (let i = 0; i < favoriteImages.length; i++) {
                if (favoriteImages[i].getAttribute("id") === imageId) {
                    Swal.fire({
                        title: "Already in favorites!",
                        icon: "error",
                        // confirmButtonText: "OK",
                        // confirmButtonColor: "#3085d6",
                        confirmButtonColor: "#1565c0",
                        showConfirmButton: false,
                        color: darkMode ? "#121212" : "#DDDDDD",
                        background: darkMode ? "#DDDDDD" : "#121212",
                        allowOutsideClick: true,
                        allowEscapeKey: true,
                        allowEnterKey: true,
                        stopKeydownPropagation: false,
                        showCloseButton: true,
                        closeButtonAriaLabel: "Close this dialog window",
                        timer: 1500,
                    });
                    return;
                }
            }

            // Add the image to favorites
            const imageClone = image.cloneNode(true); // Cloning the image to avoid reference issues
            imageClone.classList.add("favorite-image"); // Add a class for styling
            imageClone.removeAttribute("onclick"); // Remove the onclick attribute
            imageClone.addEventListener("click", () => removeFromFavorites(imageClone)); // Add a click event to remove from favorites
            const favoriteImagesContainer = document.getElementById("favorite-images-container");
            favoriteImagesContainer.appendChild(imageClone);

            // Swal.fire({
            //     title: "Added to favorites!",
            //     icon: "success",
            //     confirmButtonText: "OK",
            //     confirmButtonColor: "#3085d6",
            //     allowOutsideClick: false,
            //     allowEscapeKey: false,
            //     allowEnterKey: false,
            //     stopKeydownPropagation: false,
            //     showCloseButton: true,
            //     closeButtonAriaLabel: "Close this dialog window",
            // });
            
        } 
        // else if (result.dismiss === Swal.DismissReason.cancel) {
        //     Swal.fire({
        //         title: "Cancelled",
        //         icon: "error",
        //         confirmButtonText: "OK",
        //         confirmButtonColor: "#3085d6",
        //         allowOutsideClick: false,
        //         allowEscapeKey: false,
        //         allowEnterKey: false,
        //         stopKeydownPropagation: false,
        //         showCloseButton: true,
        //         closeButtonAriaLabel: "Close this dialog window",
        //     });
        // }
    });

    // Add the image to favorites
    // const imageClone = image.cloneNode(true); // Cloning the image to avoid reference issues
    // imageClone.classList.add("favorite-image"); // Add a class for styling
    // imageClone.removeAttribute("onclick"); // Remove the onclick attribute
    // imageClone.addEventListener("click", () => removeFromFavorites(imageClone)); // Add a click event to remove from favorites
    // const favoriteImagesContainer = document.getElementById("favorite-images-container");
    // favoriteImagesContainer.appendChild(imageClone);
};

// Remove from favorites by clicking the image
const removeFromFavorites = (image) => {
    const favoriteImagesContainer = document.getElementById("favorite-images-container");
    favoriteImagesContainer.removeChild(image);
};

// Clear all favorite images
const clearFavoritesButton = document.getElementById("clear-favorites-button");
clearFavoritesButton.addEventListener("click", () => {
    const favoriteImagesContainer = document.getElementById("favorite-images-container");

    // Remove all favorite images
    while (favoriteImagesContainer.firstChild) {
        favoriteImagesContainer.removeChild(favoriteImagesContainer.firstChild);
    }
});


// Dark mode functionality
const darkModeButton = document.getElementById("dark-mode-button");
const randomImageContainer = document.getElementById("random-images-section");
const favoriteImagesContainer = document.getElementById("favorite-images-section");
const body = document.body;
darkModeButton.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    randomImageContainer.classList.toggle("dark-mode");
    favoriteImagesContainer.classList.toggle("dark-mode");
    darkModeButton.textContent = body.classList.contains("dark-mode") ? "🌛" : "🌞";
});