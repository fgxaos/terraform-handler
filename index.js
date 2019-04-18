"use strict";

const Path = require("path"),
      Fs = require("fs");


class HCL {

  constructor(fileTypes) {

    this.fileTypes = false

    if (Array.isArray(fileTypes)) {
      this.fileTypes = fileTypes;
    }

    if (typeof(fileTypes) === "string") {
      this.fileTypes = [fileTypes];
    }

    if (this.fileTypes) {
      this.bindRequire();
    }


  }

  // requires an HCL file and returns the result object
  bindRequire() {
    const Parser = this.parse;

    function addRequire(file) {
      if (require.extensions[file]) {
        if (!require.extensions[file].__hcljs) {
          console.warning(
            "WARNING: Some other require implementation " +
            "is already present for " + file + " type" +
            ",aborting."
          );
        }
        return;
      }

      require.extensions[file] = function (module, filename) {
        const fs = require('fs'),
            hcl = Parser(fs.readFileSync(filename, 'utf8'));

        module.exports = hcl;
      };

      if (!require.extensions['.hcl']) {
        require.extensions['.hcl'] = require.extensions[file];
      }
      require.extensions[file].__hcljs = true;
    }

    for (let fileType of this.fileTypes) {
      addRequire(fileType);
    }
  }

}

// converts an object into an HCL string
HCL.prototype.stringify = require("./functions/stringify");

// parses an HCL string into an object
HCL.prototype.parse = require("./functions/hcl").parse;

// parses an HCL file into an object
HCL.prototype.load = require("./functions/load");

// converts an object into an HCL string and saves it in a .tf file
HCL.prototype.save = require("./functions/save");


module.exports = function(opts) {
  return new HCL(opts);
}