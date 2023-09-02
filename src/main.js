// const NasaUrl = 'https://images-api.nasa.gov/search?q=hubble&media_type=image&page_size=500' // 500 images

const NASA_API_URL = 'https://images-api.nasa.gov/' 
const nasaImage1 = document.querySelector(".nasa-image-1");
const nasaImage2 = document.querySelector(".nasa-image-2");
const nasaImage3 = document.querySelector(".nasa-image-3");
const nasaImages = [nasaImage1, nasaImage2, nasaImage3];

// Dark mode functionality
const body = document.body;
const darkModeButton = document.getElementById("dark-mode-button");
const randomImageContainer = document.querySelector(".random-images-section");
const favoriteImagesSection = document.querySelector(".favorite-images-section");


// Display favorite images from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    const favoriteImagesContainer = document.getElementById("favorite-images-container");
    const existingFavorites = JSON.parse(localStorage.getItem('favoriteImages')) || [];

    existingFavorites.forEach(favImage => {
        const imageClone = document.createElement('img');
        imageClone.src = favImage.src;
        imageClone.classList.add("favorite-image", "nasa-image");
        imageClone.id = favImage.id;
        imageClone.title = favImage.title;
        imageClone.description = favImage.description;
        imageClone.date = favImage.date;

        imageClone.addEventListener("click", () => removeFromFavorites(imageClone));
        favoriteImagesContainer.appendChild(imageClone);
    });
});

// Function to fetch a random NASA image
const fetchNasaImages = async () => {
    try {
        const response = await fetch(`${NASA_API_URL}search?q=hubble&media_type=image&page_size=500`);
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
        
        for (let i = 0; i < nasaImages.length; i++) {
            const randomImage = images[Math.floor(Math.random() * images.length)];

            // Get image URLs
            const imageUrl = randomImage.links[0].href;
            // Set image source
            nasaImages[i].src = imageUrl;

            // Id
            const id = randomImage.data[0].nasa_id;
            nasaImages[i].id = id;

            // Title
            const title = randomImage.data[0].title;
            nasaImages[i].title = title;

            // Description
            const description = randomImage.data[0].description;
            const firstDotIndex = description.indexOf(".");
            const trimmedDescription = description.substring(0, firstDotIndex !== -1 ? firstDotIndex + 1 : 300);
            const finalDescription = trimmedDescription.endsWith(".") ? trimmedDescription : trimmedDescription + ".";
            nasaImages[i].description = finalDescription;

            // Date
            const date = randomImage.data[0].date_created;
            nasaImages[i].date = date;

            console.log(randomImage); // Check the console to see the data
        }
    } else {
        console.log("No images available.");
    }
};
// Call the function to display NASA images
displayRandomImages();
// window.onload = displayRandomImages;

// Obtaining a random image by clicking the button
const newImage = document.getElementById("refresh-button");
newImage.addEventListener("click", displayRandomImages);

// Add to favorites by clicking the image
nasaImages.forEach((image) => {
    image.addEventListener("click", () => addToFavorites(image.id));
});

// Function to display favorite images
const addToFavorites = async (imageId) => {
    const image = await document.getElementById(imageId);
    console.log(image); // Check the console to see the image object

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
        heightAuto: true,
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

            // Add the image to favorites by cloning the image and adding it to the page
            const imageClone = image.cloneNode(true); // Cloning the image to avoid reference issues
            imageClone.classList.add("favorite-image"); // Add a class for styling
            imageClone.removeAttribute("onclick"); // Remove the onclick attribute
            imageClone.addEventListener("click", () => removeFromFavorites(imageClone)); // Add a click event to remove from favorites
            const favoriteImagesContainer = document.getElementById("favorite-images-container");
            favoriteImagesContainer.appendChild(imageClone);

            // Add the image to localStorage
            // Create an object with the image data
            const favoriteImage = {
                id: image.id,
                src: image.src,
                title: image.title,
                description: image.description,
                date: image.date,
                className: 'nasa-image'
            };

            // Get existing favorite images from localStorage
            const existingFavorites = JSON.parse(localStorage.getItem('favoriteImages')) || [];

            // Check if the image is already in localStorage
            const imageExists = existingFavorites.some(fav => fav.id === favoriteImage.id);
            if (!imageExists) {
                existingFavorites.push(favoriteImage);
                localStorage.setItem('favoriteImages', JSON.stringify(existingFavorites));
            }

            Swal.fire({
                title: "Added to favorites!",
                icon: "success",
                confirmButtonText: "OK",
                confirmButtonColor: "#3085d6",
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                stopKeydownPropagation: false,
                showCloseButton: true,
                closeButtonAriaLabel: "Close this dialog window",
                timer: 2000,
            });
            
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

};

// Remove from favorites by clicking the image
const removeFromFavorites = (image) => {
    // Sweet Alert 2: ask for confirmation to remove from favorites
    Swal.fire({
        title: "Are you sure?",
        text: "This will remove the image from your favorites.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Remove",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        allowOutsideClick: true,
        allowEscapeKey: true,
        allowEnterKey: false,
        stopKeydownPropagation: false,
        showCloseButton: true,
        closeButtonAriaLabel: "Close this dialog window",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Removed from favorites!",
                icon: "success",
                confirmButtonText: "OK",
                confirmButtonColor: "#3085d6",
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                stopKeydownPropagation: false,
                showCloseButton: true,
                closeButtonAriaLabel: "Close this dialog window",
                timer: 2000,
            });
            // removeImage(image);
            // Remove the image from the page
            const favoriteImagesContainer = document.getElementById("favorite-images-container");
            favoriteImagesContainer.removeChild(image);

            // Remove the image from localStorage
            const existingFavorites = JSON.parse(localStorage.getItem('favoriteImages')) || [];
            const updatedFavorites = existingFavorites.filter(fav => fav.id !== image.id);

            localStorage.setItem('favoriteImages', JSON.stringify(updatedFavorites));
        }
    });


    
};

// Clear all favorite images
const clearFavoritesButton = document.getElementById("clear-favorites-button");
clearFavoritesButton.addEventListener("click", () => {

    //sweet alert 2: ask for confirmation to clear all favorites
    Swal.fire({
        title: "Are you sure?",
        text: "This will remove all your favorite images.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Remove",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        allowOutsideClick: true,
        allowEscapeKey: true,
        allowEnterKey: false,
        stopKeydownPropagation: false,
        showCloseButton: true,
        closeButtonAriaLabel: "Close this dialog window",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Cleared all favorites!",
                icon: "success",
                confirmButtonText: "OK",
                confirmButtonColor: "#3085d6",
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                stopKeydownPropagation: false,
                showCloseButton: true,
                closeButtonAriaLabel: "Close this dialog window",
                // timer: 2000,
            });
            const favoriteImagesContainer = document.getElementById("favorite-images-container");

            // Remove all favorite images from the page
            while (favoriteImagesContainer.firstChild) {
                favoriteImagesContainer.removeChild(favoriteImagesContainer.firstChild);
            }

            // Remove all favorite images from localStorage
            localStorage.removeItem('favoriteImages');
        }
    });

    
});

// Dark mode functionality
darkModeButton.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    randomImageContainer.classList.toggle("dark-mode");
    favoriteImagesSection.classList.toggle("dark-mode");
    darkModeButton.textContent = body.classList.contains("dark-mode") ? "🌛" : "🌞";
});