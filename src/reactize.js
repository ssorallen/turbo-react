"use strict";

if (global.Turbolinks === undefined) {
  throw "Missing Turbolinks dependency. TurboReact requires Turbolinks be included before it.";
}

var HTMLtoJSX = require("htmltojsx");
var JSXTransformer = require("react-tools");
var React = require("react");

// Disable the Turbolinks page cache to prevent Tlinks from storing versions of
// pages with `react-id` attributes in them. When popping off the history, the
// `react-id` attributes cause React to treat the old page like a pre-rendered
// page and breaks diffing.
global.Turbolinks.pagesCached(0);

var converter = new HTMLtoJSX({createClass: false});

var Reactize = {
  version: REACTIZE_VERSION,

  applyDiff: function(replacementElement, targetElement) {
    try {
      var bod = Reactize.reactize(replacementElement);
      React.render(bod, targetElement);
    } catch(e) {
      // If any problem occurs when updating content, let Turbolinks replace
      // the page normally. That means no transitions, but it also means no
      // broken pages.
      originalReplaceChild(replacementElement, targetElement);
    }
  },

  reactize: function(element) {
    var code = JSXTransformer.transform(converter.convert(element.innerHTML));
    return eval(code);
  }
};

function applyBodyDiff() {
  Reactize.applyDiff(document.body, document.body);
  global.document.removeEventListener("DOMContentLoaded", applyBodyDiff);
}

global.document.addEventListener("DOMContentLoaded", applyBodyDiff);

// `documentElement.replaceChild` must be called in the context of the
// `documentElement`. Keep a bound reference to use later.
var originalReplaceChild =
  global.document.documentElement.replaceChild.bind(
    global.document.documentElement);

// Turbolinks calls `replaceChild` on the document element when an update should
// occur. Monkeypatch the method so Turbolinks can be used without modification.
global.document.documentElement.replaceChild = Reactize.applyDiff;

module.exports = Reactize;
