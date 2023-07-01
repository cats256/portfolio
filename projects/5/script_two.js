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

const values = [2, 4, 8, 16, 32, 64, 128];

const grid = document.querySelector(".grid-container");
const shadeButton = document.querySelector(".shade");
const solidButton = document.querySelector(".solid");
const eraseButton = document.querySelector(".erase");
const saveButton = document.querySelector(".save");
const clearButton = document.querySelector(".clear");
const slider = document.querySelector(".slider");
const size = document.querySelector(".size");

let currentSize = 16;
let mode = "shade";

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
  shadeButton.style.backgroundColor = "#ededed";
  shadeButton.style.color = "black";
  eraseButton.style.backgroundColor = "";
  eraseButton.style.color = "";
};

eraseButton.onclick = () => {
  mode = "erase";
  eraseButton.style.backgroundColor = "gray";
  eraseButton.style.color = "white";
  shadeButton.style.backgroundColor = "#ededed";
  shadeButton.style.color = "black";
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
      console.error("Oops, something went wrong!", error);
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
  currentSize = values[e.target.value];
  grid.innerHTML = "";
  setupGrid(currentSize);
};

window.onload = () => {
  setupGrid(16);
};
