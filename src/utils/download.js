import html2canvas from "html2canvas";

async function loadImage(elementContainer) {
  const orginalImg = elementContainer.querySelector("#dp-profile-image");
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
}

export function element2Cert(downloadProps) {
  console.log(downloadProps);

  async function handleDownload() {
    const elementContainer = document.getElementById(downloadProps.container);

    if (!elementContainer)
      return console.error(
        "container doesn't match the given element ID",
        downloadProps.container,
      );

    const WIDTH = downloadProps.width; //750;
    const HEIGHT = downloadProps.height; //920;

    const clone = elementContainer.cloneNode(true);

    // Apply fixed size and styles to clone
    clone.style.width = `${WIDTH}px`;
    clone.style.height = `${HEIGHT}px`;
    // clone.style.position = `${HEIGHT}px`;

    clone.style.left = "-9999px";

    document.body.appendChild(clone);
    await new Promise((r) => setTimeout(r, 100));

    try {
      const canvas = await html2canvas(clone, {
        scale: 1,
        useCORS: true,
        backgroundColor: null,
        logging: true,
        windowWidth: WIDTH,
        windowHeight: HEIGHT,
      });

      const link = document.createElement("a");
      link.download = downloadProps.fileName; //"linkedin-local-lagos-dp.png";
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

export function element2Png(el) {
  async function handleDownload() {
    // Accept either a DOM element or an ID string
    let elementContainer = null;
    if (typeof el === "string") {
      elementContainer = document.getElementById(el);
    } else if (el instanceof HTMLElement) {
      elementContainer = el;
    }
    if (!elementContainer) return;

    const orginalImg = elementContainer.querySelector("#dp-profile-image");
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

    const WIDTH = 750;
    const HEIGHT = 920;

    const clone = elementContainer.cloneNode(true);

    // Apply fixed size and styles to clone
    clone.style.width = `${WIDTH}px`;
    clone.style.height = `${HEIGHT}px`;
    clone.style.left = "-9999px";

    document.body.appendChild(clone);
    await new Promise((r) => setTimeout(r, 100));

    try {
      const canvas = await html2canvas(clone, {
        scale: 1,
        useCORS: true,
        backgroundColor: null,
        logging: false,
        windowWidth: WIDTH,
        windowHeight: HEIGHT,
      });

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