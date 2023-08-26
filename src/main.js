// const NasaUrl = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY'
// const NasaUrl = 'https://images-api.nasa.gov/search?q=hubble&media_type=image&page_size=5' // 5 images
const NasaUrl = 'https://images-api.nasa.gov/search?q=hubble&media_type=image' 
const nasaImage1 = document.getElementById("nasa-image-1");
const nasaImage2 = document.getElementById("nasa-image-2");
const nasaImage3 = document.getElementById("nasa-image-3");

// Function to fetch a random NASA image
const fetchNasaImage = async () => {
    try{
        const response = await fetch(NasaUrl);
        const data = await response.json();
        console.log(data); // Check the console to see the data
        
        const images = data.collection.items;
        // const randomImage = images[Math.floor(Math.random() * images.length)];
        const randomImage1 = images[Math.floor(Math.random() * images.length)];
        const randomImage2 = images[Math.floor(Math.random() * images.length)];
        const randomImage3 = images[Math.floor(Math.random() * images.length)];
        console.log(randomImage1); // Check the console to see the data
        
        // Get image URLs
        // const imageUrl = randomImage.links[0].href;
        const imageUrl1 = randomImage1.links[0].href;
        const imageUrl2 = randomImage2.links[0].href;
        const imageUrl3 = randomImage3.links[0].href;
        
        // Set image sources
        // nasaImage1.src = imageUrl;
        nasaImage1.src = imageUrl1;
        nasaImage2.src = imageUrl2;
        nasaImage3.src = imageUrl3;

        // Description
        // const description = randomImage1.data[0].description;
        // document.getElementById("image-description").innerHTML = description;

    } catch (err) {
        console.log(err);
    }
}
// Call the function to fetch a random NASA image
// fetchNasaImage();
window.onload = fetchNasaImage;

// Obtener una nueva imagen aleatoria cuando se hace clic en el botón
const newImage = document.getElementById("new-image-button");
newImage.addEventListener("click", fetchNasaImage);

// Dark mode functionality
const modeToggle = document.getElementById("mode-toggle");
const body = document.body;
modeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
});



// Función para obtener un número aleatorio dentro de un rango
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
// URL para obtener la lista de activos multimedia
const apiUrl = "https://images-api.nasa.gov/search?q=*&media_type=image";

// Realiza la solicitud GET para obtener la lista de activos
fetch(apiUrl)
.then(response => response.json())
    .then(data => {
        // Verifica si la respuesta contiene la colección y los elementos
        if (data.collection && data.collection.items) {
        const items = data.collection.items;

        // Obtén un índice aleatorio dentro del rango de elementos disponibles
        const randomIndex = getRandomNumber(0, items.length - 1);

        // Obtén el NASA ID aleatorio del elemento seleccionado
        const randomNasaId = items[randomIndex].data[0].nasa_id;

        // Ahora puedes usar este NASA ID en tu solicitud para obtener el manifiesto
        console.log("NASA ID aleatorio:", randomNasaId);
        // Realiza la solicitud GET al manifiesto usando randomNasaId
        // ...
        }
    })
    .catch(error => {
        console.error("Error al obtener la lista de activos:", error);
});