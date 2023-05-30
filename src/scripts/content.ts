const imageStyle = "pointer-events: none;";
const filteredImageClass = "filtered-image";

const handleIntersection = async (entries: IntersectionObserverEntry[]) => {
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
        if (entry.isIntersecting) {
          const image: any = entry.target.querySelector(".item-image");
          if (image) {
            let encodedUrl = encodeURIComponent(image.src);

            const newImg = new Image();
            newImg.onload = () => {
              image.style.cssText = imageStyle;
              image.classList.add(filteredImageClass);
              image.src = newImg.src;
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

const productItems = document.querySelectorAll(".product-item");
productItems?.forEach((item) => {
  observer.observe(item);
});

///////////////Load more //////////////////////////////////////////////////////////////////////
const loadMoreButton: any = document.querySelector(".js-load-more ");
if (loadMoreButton) {
  loadMoreButton?.addEventListener("click", () => {
    setTimeout(() => {
      const observer = new IntersectionObserver(handleIntersection);
      const productItems = document.querySelectorAll(".product-item");
      productItems?.forEach((item) => {
        observer.observe(item);
      });
    }, 3000);
  });
}

/////////////////////////////////////////////////////////// Detailed Page ////////////////////////////////////////////////////

const handleMutation = async (entries: IntersectionObserverEntry[]) => {
  chrome.storage.local.get(["Toggle"]).then(async (response) => {
    if (response.Toggle) {
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
        // console.log(entry, "entryyyyyyy");

        if (entry.isIntersecting) {
          const image: any = entry.target;
          image.srcset = "";
          let encodedUrl = encodeURIComponent(image.src);

          if (image) {
            image.src = `https://cm5yk0mhq7.execute-api.us-west-2.amazonaws.com/staging-replaceskintone?modelurl=${encodedUrl}&userskintone=${index0},${index1},${index2}`;
          }
          observerw.unobserve(entry.target);
        }
      });
    }
  });
};

const observerw: any = new IntersectionObserver(handleMutation);

const productContainer: any = document.querySelectorAll(".product-detail-main-image-container img");

productContainer.forEach((item: any) => {
  observerw.observe(item);
});
////////////////////////////////////////////////////////////////pdp images/////////////////////////////////////////////////////////////////////
// const handleMutationPdp = async (entries: IntersectionObserverEntry[]) => {
//   chrome.storage.local.get(["Toggle"]).then(async (response) => {
//     if (response.Toggle) {
//       let hsvData = await chrome.storage.local
//         .get(["configData"])
//         .then((res) => res.configData.selectedColor.hsv);
//       let hsvValues = hsvData[0]
//         .replace(/[^\d,]/g, "")
//         .split(",")
//         .map(Number);
//       let index0 = Math.round((hsvValues[0] * 360) / 1000);
//       let index1 = Math.round((hsvValues[1] * 255) / 100);
//       let index2 = Math.round((hsvValues[2] * 255) / 100);
//       setTimeout(() => {
//         entries.forEach((entry) => {
//           console.log(entry);
//           if (entry.isIntersecting) {
//             const pdpImage: any = entry.target.querySelector(".pdp-secondary-image img");
//             console.log("====================================");
//             console.log(pdpImage);
//             console.log("====================================");
//             if (pdpImage) {
//               pdpImage.srcset = "";
//               let encodedUrl = encodeURIComponent(pdpImage.src);
//               pdpImage.src = `https://cm5yk0mhq7.execute-api.us-west-2.amazonaws.com/staging-replaceskintone?modelurl=${encodedUrl}&userskintone=${index0},${index1},${index2}`;
//             }
//             observerPdp.unobserve(entry.target);
//           }
//         });
//       }, 10000);
//     }
//   });
// };

// const observerPdp: any = new IntersectionObserver(handleMutationPdp);

// const productContainerPDP: any = document.querySelectorAll(".product-description");

// productContainerPDP.forEach((item: any) => {
//   observerPdp.observe(item);
// });

export {};
