"use strict";

class Shape {
  _name; 
  _color; 

  constructor(name, color) {
    this._name = name; // setting the initial value of name
    this._color = color; // setting the initial value of color
  }

  // setter for name
    set name(value) {
        //not required now, but for practice and since i'm using select element to get the name
        // doesn't need of this validation
    if (typeof value !== "string") {
      throw new Error("Please provide a valid name as a string");
    }
    this._name = value;
  }

  // setter for color
    set color(value) {
    if (typeof value !== "string") {
      throw new Error("Please provide a valid color as a string");
    }
    this._color = value;
  }

  // getter for name
  get name() {
    return this._name;
  }

  // getter for color
  get color() {
    return this._color;
  }

  // method to get info about the shape
  getInfo(colors) {
    // Get the color name from the color value
    const colorName = Object.keys(colors).find(
      (key) => colors[key] === this._color
    );
    return `${colorName} ${this._name}`;
  }
}

export { Shape }; // Export the Shape class
