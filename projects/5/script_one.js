const resizeText = (element) => {
  const container = document.querySelector(element);
  let fontSize = 80;

  do {
    fontSize--;
    container.style.fontSize = fontSize + "px";
  } while (container.scrollWidth > container.offsetWidth);
};
