"use strict";

import { Shape } from "./classes.js";
import { onEvent, getElement, select, selectAll } from "./utility-functions.js";

// Dom elements
const shapeSelect = getElement("shape");
const colorSelect = getElement("color");
const createButton = getElement("create-button");
const grid = getElement("grid");
const feedback = getElement("feedback");
const clearButton = getElement("clear-button");

// Shape select function and event listener

// Define a function called selectShape
function selectShape() {
  // Get the value of the shapeSelect element and assign it to the shape variable
  const shape = shapeSelect.value;

  // Return the value of the shape variable
  return shape;
}

function formatShapeName(shapeName) {
  // Convert to lowercase and then capitalize the first letter
  return shapeName.charAt(0).toUpperCase() + shapeName.slice(1).toLowerCase();
}

// Color select function and event listener

const colors = {
  Blue: "#09f",
  Green: "#9f0",
  Orange: "#f90",
  Pink: "#f09",
  Purple: "#90f",
};

// Function to select a color
function selectColor() {
  // Get the selected color name from the colorSelect element
  const colorName = colorSelect.value;

  // Get the corresponding color value from the colors object using the colorName as the key
  const colorValue = colors[colorName];

  // Return the selected color value
  return colorValue;
}

// Array to store shapes
const shapes = [];

// function to limit the number of shapes created to 25

// This function checks if the number of shapes is already at the maximum limit of 25.
// If the limit is reached, it disables the createButton and displays a feedback message in red.
// Otherwise, it enables the createButton.

function limitShapes() {
  // Check if the number of shapes is already at the maximum limit of 25
  if (shapes.length >= 25) {
    // Disable the createButton
    createButton.disabled = true;
    // Display a feedback message indicating that the maximum number of shapes has been reached
    feedback.textContent = `You have reached the maximum number of shapes (25).
      Please click the "Clear All" button to remove all shapes.`;
    // Change the color of the feedback message to red
    feedback.style.color = "red";
  } else {
    // Enable the createButton
    createButton.disabled = false;
  }
}

function createShape() {
  // Get the shape name from the selectShape function
  const shapeName = selectShape();

  // Format the shape name by capitalizing the first letter and making the rest lowercase
  const formattedShapeName = formatShapeName(shapeName);

  // Get the color from the selectColor function
  const color = selectColor();

  // Create a new Shape object with the formatted shape name and color
  const shape = new Shape(formattedShapeName, color);

  // Add the shape to the shapes array
  shapes.push(shape);

  // Create a new div element for the shape
  const shapeDiv = document.createElement("div");

  // Set the class name of the div element to the lowercase shape name
  shapeDiv.className = shapeName.toLowerCase();

  // Check if the shape name is "triangle"
  if (shapeName === "triangle") {
    // If it is, set the border style of the div element to create a triangle
    shapeDiv.style.borderBottom = `10rem solid ${color}`;
  } else {
    // If it's not a triangle, set the background color of the div element to the color
    shapeDiv.style.backgroundColor = color;
  }

  // Set the data attribute "index" of the div element to the index of the shape in the shapes array
  shapeDiv.dataset.index = shapes.length - 1;

  // Add an event listener to the div element for the "click" event
  onEvent("click", shapeDiv, function () {
    // Get the index of the shape in the shapes array
    const index = shapes.indexOf(shape);

    // Set the text content of the feedback element to display the unit position and shape info
    feedback.textContent = `Unit Position: ${index + 1} - ${shape.getInfo(
      colors
    )}`;
  });

  // Append the shapeDiv to the grid element
  grid.appendChild(shapeDiv);

  // Call the limitShapes function to check if the maximum number of shapes has been reached
  limitShapes();
}

// Add the event listener for the clear button here, outside of any function

// This function is triggered when a "click" event occurs on the clearButton element.
onEvent("click", clearButton, function () {
  // Remove all child elements from the grid element until there are no more child elements left.
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }

  // Clear the shapes array by setting its length to 0, effectively removing all elements.
  shapes.length = 0;

  // Clear the text content of the feedback element.
  feedback.textContent = "";

  // Call the limitShapes() function to limit the number of shapes.
  limitShapes();
});

// Add click event listener to the create button
onEvent("click", createButton, createShape);
