"use strict";

import { Shape } from "./Shapes.js";
import { onEvent, getElement, select, selectAll } from "./utility-functions.js";

// Dom elements
const shapeSelect = getElement("shape");
const colorSelect = getElement("color");
const createButton = getElement("create-button");
const grid = getElement("grid");
const feedback = getElement("feedback");
const clearButton = getElement("clear-button");

function selectShape() {
  const shape = shapeSelect.value;
  return shape;
}

function formatShapeName(shapeName) {
  return shapeName.charAt(0).toUpperCase() + shapeName.slice(1).toLowerCase();
}


const colors = {
  Blue: "#09f",
  Green: "#9f0",
  Orange: "#f90",
  Pink: "#f09",
  Purple: "#90f",
};

function selectColor() {
  const colorName = colorSelect.value;
  const colorValue = colors[colorName];
  return colorValue;
}

const shapes = [];

function limitShapes() {
  if (shapes.length >= 25) {
    createButton.disabled = true;
    feedback.textContent = `You have reached the maximum number of shapes (25).
      Please click the "Clear" button to remove all shapes.`;
    feedback.style.color = "red";
  } else {
    createButton.disabled = false;
  }
}

function createShape() {
  const shapeName = selectShape();

  const formattedShapeName = formatShapeName(shapeName);

  const color = selectColor();

  const shape = new Shape(formattedShapeName, color);

  shapes.push(shape);

  const shapeDiv = document.createElement("div");

  shapeDiv.className = shapeName.toLowerCase();

  if (shapeName === "triangle") {
    shapeDiv.style.borderBottom = `10rem solid ${color}`;
  } else {
    shapeDiv.style.backgroundColor = color;
  }

  shapeDiv.dataset.index = shapes.length - 1;

  onEvent("click", shapeDiv, function () {
    const index = shapes.indexOf(shape);

    feedback.textContent = `Unit Position: ${index + 1} - ${shape.getInfo(
      colors
    )}`;
  });

  grid.appendChild(shapeDiv);

  limitShapes();
}


onEvent("click", clearButton, function () {
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }
  shapes.length = 0;
  feedback.textContent = "";
  feedback.style.color = "inherit";

  limitShapes();
});

onEvent("click", createButton, createShape);
