import html2canvas from "html2canvas";
import domtoimage from "dom-to-image";

export default function element2Pdf(el) {
  async function handleDownload() {
    const elementContainer = document.getElementById(el);
    if (!elementContainer) return;

    const orginalImg = elementContainer.querySelector('img[alt="preview"]');
    if (!orginalImg)
      return alert("Include Image and name to download your profile ");

    const preloadImg = new Image();
    preloadImg.src = orginalImg.src;
    preloadImg.crossOrigin = "Anonymous";

    await new Promise((resolve) => {
      if (preloadImg.complete) {
        resolve();
      } else {
        preloadImg.onload = resolve;
        preloadImg.onerror = () => {
          console.error("Image failed to load, proceeding anyway");
          resolve();
        };
      }
    });

    const clone = elementContainer.cloneNode(true);

    // Apply fixed size and styles to clone
    clone.style.position = "absolute";
    clone.style.left = "-9999px"; // Off-screen (remove for debugging)
    clone.style.top = "0";
    clone.style.width = "750px";
    clone.style.height = "950px";
    clone.style.margin = "0";
    clone.style.padding = "0";
    clone.style.boxSizing = "border-box";
    clone.style.backgroundSize = "cover";
    clone.style.backgroundRepeat = "no-repeat";
    clone.style.overflow = "hidden";

    // Adjust .canvas-image-upload
    const uploadContainer = clone.querySelector(".canvas-image-upload");
    if (uploadContainer) {
      uploadContainer.style.position = "absolute";
      uploadContainer.style.width = `${750 * 0.68}px`; // 510px
      uploadContainer.style.height = `${750 * 0.68}px`; // Square for aspect-ratio 1:1
      uploadContainer.style.top = `${950 * 0.06}px`; // 57px
      uploadContainer.style.left = `${750 * 0.16}px`; // 120px
      uploadContainer.style.overflow = "hidden"; // Enforce clipping
    }

    // Adjust .upload-box (diamond container)
    const uploadBox = clone.querySelector(".upload-box");
    if (uploadBox) {
      uploadBox.style.width = "100%";
      uploadBox.style.height = "100%";
      uploadBox.style.overflow = "hidden";
      uploadBox.style.clipPath = "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)";
      uploadBox.style.border = "2px dashed var(--text, #000)"; // Fallback for CSS var
      uploadBox.style.background = "var(--neutral, #fff)"; // Fallback
    }

    // Adjust the image
    const img = clone.querySelector(".canvas-image-upload img");
    if (img) {
      img.src = preloadImg.src; // Use preloaded image
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "contain"; // Try 'contain' to prevent overflow (test 'cover' if needed)
      img.style.objectPosition = "center";
      img.style.clipPath = "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"; // Double-clip for safety
    }

    document.body.appendChild(clone);

    try {
      const canvas = await html2canvas(clone, {
        scale: 1,
        useCORS: true,
        backgroundColor: null, // Transparent if needed
        logging: false,
        windowWidth: 750,
        windowHeight: 950,
      });

      // Debug: Append canvas to DOM to inspect
      // canvas.style.position = "fixed";
      // canvas.style.top = "0";
      // canvas.style.left = "0";
      // document.body.appendChild(canvas);

      const link = document.createElement("a");
      link.download = "linkedin-local-lagos-dp.png";
      link.href = canvas.toDataURL("image/png", 1.0);
      link.click();
    } catch (error) {
      console.log("captured Failed'", error);
    } finally {
      document.body.removeChild(clone);
    }
  }
  return handleDownload();
}

// import domtoimage from "dom-to-image"; // Ensure installed: npm install dom-to-image

// async function loadImages(images) {
//   if (images.length === 0) return;

//   const preloadedImages = images.map((image) => {
//     const preloadImage = new Image();
//     preloadImage.src = image.src;
//     preloadImage.crossOrigin = "Anonymous";
//   });

//   await Promise(
//     preloadedImages.map((preloadedImage) => {
//       new Promise((resolve) => {
//         if (preloadedImage.complete) resolve();
//         else {
//           preloadedImage.onload = resolve;
//           preloadedImage.onerror = () => {
//             console.warn("Image failed to load:", preloadedImage.src);
//             resolve();
//           };
//         }
//       });
//     })
//   );

//   console.log(preloadedImages);
// }

// const handleDownload = async (el) => {
//   const targetElement = document.getElementById(el);
//   if (!targetElement) {
//     console.error("Background container not found");
//     return;
//   }

//   // Get the image source from the original DOM
//   const bgImage = targetElement.querySelector("#bgImage");
//   const previewImg = targetElement.querySelector("#previewImage");
//   console.log(bgImage, previewImg);

//   if (!bgImage || !previewImg)
//     throw console.error("background or preview images missing");

//   loadImages([bgImage, previewImg]);

//   // Deep-clone the container
//   const clone = targetElement.cloneNode(true);

//   // Apply fixed size and styles to clone
//   clone.style.position = "absolute";
//   clone.style.left = "9999px"; // Off-screen (remove for debugging: set to '0' and add zIndex: '9999')
//   clone.style.top = "0";
//   clone.style.width = "750px";
//   clone.style.height = "950px";
//   clone.style.margin = "0";
//   clone.style.padding = "0";
//   clone.style.boxSizing = "border-box";
//   clone.style.backgroundSize = "cover"; // Ensure background scales
//   clone.style.backgroundRepeat = "no-repeat";
//   clone.style.overflow = "hidden";

//   // Adjust .canvas-image-upload
//   const uploadContainer = clone.querySelector(".canvas-image-upload");
//   if (uploadContainer) {
//     uploadContainer.style.position = "absolute";
//     uploadContainer.style.width = `${750 * 0.68}px`; // 510px
//     uploadContainer.style.height = `${750 * 0.68}px`; // Square for aspect-ratio 1:1
//     uploadContainer.style.top = `${950 * 0.06}px`; // 57px
//     uploadContainer.style.left = `${750 * 0.16}px`; // 120px
//     uploadContainer.style.overflow = "hidden"; // Enforce clipping
//   }

//   // Adjust .upload-box (diamond container)
//   const uploadBox = clone.querySelector(".upload-box");
//   if (uploadBox) {
//     uploadBox.style.width = "100%";
//     uploadBox.style.height = "100%";
//     uploadBox.style.overflow = "hidden";
//     uploadBox.style.clipPath = "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)";
//     uploadBox.style.border = "2px dashed var(--text, #000)"; // Fallback for CSS var
//     uploadBox.style.background = "var(--neutral, #fff)"; // Fallback
//   }

//   // Adjust the image
//   const img = clone.querySelector(".canvas-image-upload img");
//   if (img) {
//     img.src = previewImg.src; // Use preloaded image
//     img.crossOrigin = "Anonymous";
//     img.style.width = "100%";
//     img.style.height = "100%";
//     img.style.objectFit = "contain"; // Use 'contain' to prevent overflow; test 'cover' if needed
//     img.style.objectPosition = "center";
//     img.style.clipPath = "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"; // Double-clip for safety
//   }

//   document.body.appendChild(clone);

//   try {
//     // Capture with dom-to-image
//     const dataUrl = await domtoimage.toPng(clone, {
//       width: 750,
//       height: 950,
//       style: { overflow: "hidden" },
//       quality: 1,
//       bgcolor: null
//     });

//     const previewImg = new Image();
//     previewImg.src = dataUrl;
//     previewImg.style.position = "fixed";
//     previewImg.style.top = "0";
//     previewImg.style.left = "0";
//     previewImg.style.zIndex = "9999";

//     document.body.appendChild(previewImg); // Remove after inspecting

//     // Download
//     const link = document.createElement("a");
//     link.download = "profile-dp.png";
//     link.href = dataUrl;
//     link.click();

//     setTimeout(() => document.body.removeChild(previewImg), 5000); // Remove after 5s
//   } catch (error) {
//     console.error("Capture failed:", error);
//   } finally {
//     document.body.removeChild(clone);
//   }
// };

// export default handleDownload;
// // Usage in your component
// // <button onClick={handleDownload}>Download DP</button>
