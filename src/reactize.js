"use strict";

var HTMLtoJSX = require("htmltojsx");
var JSXTransformer = require("react-tools");
var React = require("react");
var Turbolinks = require("exports?this.Turbolinks!turbolinks");

// Disable the Turbolinks page cache to prevent Tlinks from storing versions of
// pages with `react-id` attributes in them. When popping off the history, the
// `react-id` attributes cause React to treat the old page like a pre-rendered
// page and breaks diffing.
Turbolinks.pagesCached(0);

var converter = new HTMLtoJSX({createClass: false});
var nextDocument;

var Reactize = {
  version: REACTIZE_VERSION,

  applyDiff: function(replacementElement, targetElement) {
    try {
      var bod = Reactize.reactize(replacementElement);
      React.render(bod, targetElement);
    } catch(e) {
      // If any problem occurs when updating content, send the browser to a full
      // load of what should have been the next page. Reactize should not
      // prevent navigation if there's an exception.
      if (nextDocument !== undefined && nextDocument.URL !== undefined) {
        window.location.href = nextDocument.URL;
      }
    }
  },

  reactize: function(element) {
    var code = JSXTransformer.transform(converter.convert(element.innerHTML));
    return eval(code);
  }
};

document.addEventListener("page:before-unload", function(event) {
  // Keep a reference to the next document to be loaded.
  nextDocument = event.target;
});

function applyBodyDiff() {
  Reactize.applyDiff(document.body, document.body);
  global.document.removeEventListener("DOMContentLoaded", applyBodyDiff);
}

global.document.addEventListener("DOMContentLoaded", applyBodyDiff);

// Turbolinks calls `replaceChild` on the document element when an update should
// occur. Monkeypatch the method so Turbolinks can be used without modification.
global.document.documentElement.replaceChild = Reactize.applyDiff;

// Expose Turbolinks as a global to allow configuration like enabling the
// progress bar.
global.Turbolinks = Turbolinks;

// Expose Reactize as a global to allow usage.
// * TODO: Consider whether there's value in exposing as a global?
global.Reactize = Reactize;

module.exports = Reactize;
