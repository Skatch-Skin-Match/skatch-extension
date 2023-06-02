const imageStyle = "pointer-events: none;";
const filteredImageClass = "filtered-image";

// below commented code is also working if read the it ,it requires setTime function as dom loads before page , therefore second method has been used which targets all the images on the page.

// first method

const handleIntersection = async (entries: IntersectionObserverEntry[]) => {
  console.log(entries, "entries");
  // console.log("getting here");

  chrome.storage.local.get(["Toggle"]).then(async (response) => {
    if (response.Toggle) {
      let desiredImgUrl: any;
      let hsvData = await chrome.storage.local
        .get(["configData"])
        .then((res) => res.configData.selectedColor.hsv);

      let hsvValues = hsvData[0]
        .replace(/[^\d,]/g, "")
        .split(",")
        .map(Number);
      let index0 = Math.round((hsvValues[0] * 360) / 1000);
      let index1 = Math.round((hsvValues[1] * 255) / 100);
      let index2 = Math.round((hsvValues[2] * 255) / 100);

      entries.forEach((entry) => {
        console.log(entry, "entry singel");

        if (entry.isIntersecting) {
          const image: any = entry.target.querySelector(".fr-ec-image__img");
          const imgParent: any = entry.target.querySelector(".fr-ec-image");
          if (image) {
            let encodedUrl = encodeURIComponent(image.src);

            const newImg = new Image();
            newImg.onload = () => {
              image.style.cssText = imageStyle;
              image.classList.add(filteredImageClass);
              image.src = newImg.src;
              imgParent.style.backgroundImage = `url("${newImg.src}")`;
            };
            desiredImgUrl = `https://cm5yk0mhq7.execute-api.us-west-2.amazonaws.com/staging-replaceskintone?modelurl=${encodedUrl}&userskintone=${index0},${index1},${index2}`;

            newImg.src = desiredImgUrl;
          }
          observer.unobserve(entry.target);
        }
      });
    }
  });
};

const observer = new IntersectionObserver(handleIntersection);
setTimeout(() => {
  let productItems: any;
  productItems = document.querySelectorAll(".fr-ec-product-tile-resize-wrapper");
  console.log("product", productItems);
  productItems?.forEach((item: any) => {
    observer.observe(item);
  });
}, 5000);

// second method

// const observer = new IntersectionObserver((entries) => {
//   // Create an IntersectionObserver instance that will be triggered when images are in the viewport
//   chrome.storage.local.get(["Toggle"]).then(async (response) => {
//     // Retrieve the value of "Toggle" from the local Chrome storage
//     if (response.Toggle) {
//       // If "Toggle" is truthy (e.g., exists and is not false, 0, null, or undefined)
//       let desiredImgUrl: any;

//       // Retrieve the HSV color data from the local Chrome storage
//       let hsvData = await chrome.storage.local
//         .get(["configData"])
//         .then((res) => res.configData.selectedColor.hsv);

//       // Extract the individual HSV values from the retrieved data
//       let hsvValues = hsvData[0]
//         .replace(/[^\d,]/g, "")
//         .split(",")
//         .map(Number);

//       // Convert the HSV values to appropriate scales (e.g., degrees, 0-255 range)
//       let index0 = Math.round((hsvValues[0] * 360) / 1000);
//       let index1 = Math.round((hsvValues[1] * 255) / 100);
//       let index2 = Math.round((hsvValues[2] * 255) / 100);

//       // Process each observed entry
//       entries.forEach((entry: any) => {
//         if (entry.isIntersecting) {
//           // If the observed image is intersecting the viewport
//           const image: any = entry.target;
//           if (image) {
//             // Encode the image URL to include in the desiredImgUrl
//             let encodedUrl = encodeURIComponent(image.src);
//             const newImg = new Image();
//             newImg.onload = () => {
//               // When the new image is loaded, apply the desired CSS styles and replace the source of the original image
//               image.style.cssText = imageStyle;
//               image.classList.add(filteredImageClass);
//               image.src = newImg.src;
//             };

//             // Build the desiredImgUrl using the encoded image URL and the HSV color values
//             desiredImgUrl = `https://cm5yk0mhq7.execute-api.us-west-2.amazonaws.com/staging-replaceskintone?modelurl=${encodedUrl}&userskintone=${index0},${index1},${index2}`;

//             // Start loading the new image with the desired skin tone
//             newImg.src = desiredImgUrl;
//           }

//           // Stop observing the current entry (image) once it has been processed
//           observer.unobserve(entry.target);
//         }
//       });
//     }
//   });
// });

// // Attach the "handleLoadAndScroll" function to the "load" and "scroll" events of the window
// window.addEventListener("load", handleLoadAndScroll);
// window.addEventListener("scroll", handleLoadAndScroll);

// // Function to handle image loading and scrolling events
// function handleLoadAndScroll() {
//   // Retrieve all <img> elements in the document
//   const images = document.getElementsByTagName("img");
//   const imagesArray = Array.from(images);

//   // Iterate over each image and check if it meets certain size criteria
//   imagesArray.forEach((image) => {
//     const renderedWidth = image.offsetWidth;
//     const renderedHeight = image.offsetHeight;

//     if (
//       (renderedWidth > 200 || renderedHeight > 200) &&
//       image.naturalWidth >= 200 &&
//       image.naturalHeight >= 200
//     ) {
//       // If the image satisfies the size criteria, start observing it
//       observer.observe(image);
//     }
//   });
// }

export {};
