const imageContainer = document.getElementById('image-container');
const loadingSpinner = document.getElementById('loader');

let imageArray = [];
let loadedImagesCounter = 0;
let imagesToLoad  = 0;
let imagesNumberToLoad = 5;
let loadedImagesStatus = false;

const apiKey = 'Y2ZGbz_LPjpuBwXXdXmLHQW_Z-sBoQr3ncy_R0UZ6tc'; 
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${imagesNumberToLoad}`;

function imageLoaded(){
  loadedImagesCounter++; 
  if (loadedImagesCounter === imagesToLoad) {
    loadedImagesStatus = true;
    loadingSpinner.hidden = true;
    imageContainer.hidden = false;
    imagesNumberToLoad = 20;
    loadedImagesCounter = 0;
  }
}

function setImageAttributes (element, attributes){
  for (const key in attributes){
    element.setAttribute(key, attributes[key]);
  }
}

function displayImages(){
  imagesToLoad = imageArray.length;
  imageArray.forEach((image) => {
    const item = document.createElement('a');
    setImageAttributes(item, {
      href: image.links.html, //diff way: element.setAttribute(attribute, value);
      target: '_blank',
    });

    if (image.description == null){
       image.description = "Sorry, author didn't provide any description :(";
    }

    const img = document.createElement('img');
    setImageAttributes(img, {
      src: image.urls.regular,
      alt: image.alt_description,
      title: image.description,
    });

    img.addEventListener('load', imageLoaded)

    item.appendChild(img);
    imageContainer.appendChild(item);
  }); 
}

async function getImagesFromApi(){
 try {
  const response = await fetch(apiUrl);
  imageArray = await response.json();
  displayImages();
 }catch(error){
  console.log("Something gone wrong :( ", error);
 }
} 

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && loadedImagesStatus){
    loadedImagesStatus = false; 
    getImagesFromApi();
  }
});

getImagesFromApi();