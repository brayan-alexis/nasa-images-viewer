// const NasaUrl = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY'
// const NasaUrl = 'https://images-api.nasa.gov/search?q=hubble&media_type=image&page_size=5' // 5 images
const NASA_API_URL = 'https://images-api.nasa.gov/' 
const nasaImage1 = document.getElementById("nasa-image-1");
const nasaImage2 = document.getElementById("nasa-image-2");
const nasaImage3 = document.getElementById("nasa-image-3");

const error = document.getElementById("error");

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

        // Get image URLs
        const imageUrl1 = randomImage1.links[0].href;
        const imageUrl2 = randomImage2.links[0].href;
        const imageUrl3 = randomImage3.links[0].href;

        // Set image sources
        nasaImage1.src = imageUrl1;
        nasaImage2.src = imageUrl2;
        nasaImage3.src = imageUrl3;

        // Description
        // const description = randomImage1.data[0].description;
        // document.getElementById("image-description").innerHTML = description;
    } else {
        console.log("No images available.");
        // error.innerHTML = response.status;
    }
}
// Call the function to display NASA images
displayRandomImages();
// window.onload = displayRandomImages;

// Function to display favorite images
const addToFavorites = (imageId) => {
    const image = document.getElementById(imageId);

    // Check if the page contains dark mode
    // const body = document.body;
    let darkMode = false;
    if (body.classList.contains("dark-mode")) {
        darkMode = true;
    }

    // Check if the image is already in favorites
    // CHECK LATERRR!!!!
    // const favoriteImages = document.querySelectorAll(".favorite-image");
    // for (let i = 0; i < favoriteImages.length; i++) {
    //     if (favoriteImages[i].getAttribute("id") === imageId) {
    //         Swal.fire({
    //             title: "Already in favorites!",
    //             icon: "error",
    //             // confirmButtonText: "OK",
    //             // confirmButtonColor: "#3085d6",
    //             // confirmButtonColor: "#1565c0",
    //             showConfirmButton: false,
    //             background: darkMode ? "#DDDDDD" : "#121212",
    //             allowOutsideClick: true,
    //             allowEscapeKey: true,
    //             allowEnterKey: true,
    //             stopKeydownPropagation: false,
    //             showCloseButton: true,
    //             closeButtonAriaLabel: "Close this dialog window",
    //             timer: 1500,
    //         });
    //         return;
    //     }
    // }
    

    //Sweet Alert 2: Show image title and description in a modal and ask for confirmation to add to favorites
    Swal.fire({
        title: image.title,
        text: image.description,
        imageUrl: image.src,
        imageAlt: image.title,
        confirmButtonText: "Add to favorites",
        showCancelButton: true,
        cancelButtonText: "Cancel",
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
            // Add the image to favorites
            const imageClone = image.cloneNode(true); // Cloning the image to avoid reference issues
            imageClone.classList.add("favorite-image"); // Add a class for styling
            imageClone.removeAttribute("onclick"); // Remove the onclick attribute
            imageClone.addEventListener("click", () => removeFromFavorites(imageClone)); // Add a click event to remove from favorites
            const favoriteImagesContainer = document.getElementById("favorite-images-container");
            favoriteImagesContainer.appendChild(imageClone);
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

// Function to remove all favorite images
const removeFromFavorites = (image) => {
    const favoriteImagesContainer = document.getElementById("favorite-images-container");
    favoriteImagesContainer.removeChild(image);
};

// Add to favorites by clicking the image
// const addToFavoritesButtons = document.querySelectorAll(".add-to-favorites");
// addToFavoritesButtons.forEach(button => {
//     button.addEventListener("click", event => {
//         const imageId = event.target.getAttribute("data-image");
//         addToFavorites(imageId);
//     });
// });

// Add to favorites by clicking the image
const clearFavoritesButton = document.getElementById("clear-favorites-button");
clearFavoritesButton.addEventListener("click", () => {
    const favoriteImagesContainer = document.getElementById("favorite-images-container");
    favoriteImagesContainer.innerHTML = ""; // Clear all favorite images
});



// Obtaining a random image by clicking the button
const newImage = document.getElementById("refresh-button");
// newImage.addEventListener("click", fetchNasaImage);
newImage.addEventListener("click", displayRandomImages);

// Dark mode functionality
// const modeToggle = document.getElementById("mode-toggle");
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