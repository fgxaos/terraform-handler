"use strict";

const Path = require("path");
const fs = require("fs");

const stringify = require("./stringify");

module.exports = function save(file, path, opts) {

    file = stringify(file);

    opts || (opts = {})

    try {
        file = fs.writeFileSync(path, file, { encoding: "UTF8" })
            .toString()
            .trim();
    } catch (error) {
        return error;
    }

    if (file === null || file === "") {
        return new Error(`There's nothing to save`);
    }
}