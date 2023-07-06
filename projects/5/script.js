const shadeColor = (element) => {
  let currentColor = window.getComputedStyle(element).backgroundColor;

  switch (mode) {
    case "solid":
      element.style.backgroundColor = "black";
      break;
    case "erase":
      element.style.backgroundColor = "white";
      break;
    default:
      let rgbValues = currentColor.match(/\d+/g);
      let [red, green, blue] = rgbValues.map((value) => parseInt(value) - 51);

      element.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
      break;
  }
};

const setupGrid = (size) => {
  grid.style.gridTemplate = `repeat(${size}, 1fr) / repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const gridItem = document.createElement("div");

    gridItem.addEventListener("mouseover", () => shadeColor(gridItem));
    gridItem.classList.add("grid-item");
    grid.appendChild(gridItem);
  }
};

const resizeText = () => {
  let fontSize = 76;
  const setFontSize = () => (text.style.fontSize = fontSize + "px");

  setFontSize();

  if (text.offsetWidth > container.offsetWidth) {
    while (text.offsetWidth > container.offsetWidth) {
      fontSize -= 1;
      setFontSize();
    }
  } else {
    while (text.offsetWidth < container.offsetWidth) {
      fontSize += 1;
      setFontSize();
    }
    fontSize -= 1;
    setFontSize();
  }
};

const values = [2, 4, 8, 16, 32, 64, 128];
let currentSize = 16;
let mode = "shade";

const grid = document.querySelector(".grid-container");
const shadeButton = document.querySelector(".shade");
const solidButton = document.querySelector(".solid");
const eraseButton = document.querySelector(".erase");
const saveButton = document.querySelector(".save");
const clearButton = document.querySelector(".clear");
const slider = document.querySelector(".slider");
const size = document.querySelector(".size");
const container = document.querySelector(".title-container");
const text = document.querySelector(".title");

shadeButton.onclick = () => {
  mode = "shade";
  shadeButton.style.backgroundColor = "gray";
  shadeButton.style.color = "white";
  solidButton.style.backgroundColor = "";
  solidButton.style.color = "";
  eraseButton.style.backgroundColor = "";
  eraseButton.style.color = "";
};

solidButton.onclick = () => {
  mode = "solid";
  solidButton.style.backgroundColor = "gray";
  solidButton.style.color = "white";
  shadeButton.style.backgroundColor = "";
  shadeButton.style.color = "";
  eraseButton.style.backgroundColor = "";
  eraseButton.style.color = "";
};

eraseButton.onclick = () => {
  mode = "erase";
  eraseButton.style.backgroundColor = "gray";
  eraseButton.style.color = "white";
  shadeButton.style.backgroundColor = "";
  shadeButton.style.color = "";
  solidButton.style.backgroundColor = "";
  solidButton.style.color = "";
};

saveButton.onclick = () => {
  domtoimage
    .toPng(grid)
    .then(function (dataUrl) {
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "etch-a-sketch.png";
      link.click();
    })
    .catch(function (error) {
      window.alert("Oops, something went wrong! Please try again", error);
    });
};

clearButton.onclick = () => {
  grid.innerHTML = "";
  setupGrid(currentSize);
};

slider.addEventListener("input", () => {
  size.innerHTML = `${values[slider.value]} x ${values[slider.value]}`;
});

slider.onchange = (e) => {
  grid.innerHTML = "";
  currentSize = values[e.target.value];
  setupGrid(currentSize);
};

window.addEventListener('resize', function() {
  resizeText();
});

window.onload = () => {
  shadeButton.style.backgroundColor = "gray";
  shadeButton.style.color = "white";
  resizeText();
  setupGrid(16);
};
