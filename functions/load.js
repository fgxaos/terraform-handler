"use strict";

const Path = require("Path");
const fs = require("fs");

module.exports = function load(path, opts) {

  let result = {},
      file = null;

  opts || (opts = {})

  if (!fs.existsSync(path)) {
    let error = new Error(`${path} is not a file`);
    return error;
  }

  const stats = fs.lstatSync(path);
  if (stats.isDirectory()) {
    let error = new Error(`${path} is a directory`);
    return error;
  }

  try {

    file = fs.readFileSync(path, {encoding: "UTF8"})
      .toString()
      .trim();

  } catch(error) {
    return error;
  }

  if (file === null || file === "") {
    return new Error(`${path} is an empty file`);
  }

  // It is safe to assume we have a readable file contents at this point
  return this.parse(file, opts);
}