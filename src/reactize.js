require("turbolinks");

var HTMLtoJSX = require("htmltojsx");
var JSXTransformer = require("react-tools");
var React = require("react");

var Reactize = {
  version: "0.4.1"
};

var converter = new HTMLtoJSX({createClass: false});

Reactize.reactize = function(element) {
  var code = JSXTransformer.transform(converter.convert(element.innerHTML));
  return eval(code);
};

Reactize.applyDiff = function(replacementElement, targetElement) {
  var bod = Reactize.reactize(replacementElement);
  React.render(bod, targetElement);
};

function applyBodyDiff() {
  Reactize.applyDiff(document.body, document.body);
  global.removeEventListener("load", applyBodyDiff);
}

global.addEventListener("load", applyBodyDiff);

// Turbolinks calls `replaceChild` on the document element when an update should
// occur. Monkeypatch the method so Turbolinks can be used without modification.
global.document.documentElement.replaceChild = Reactize.applyDiff;

module.exports = global.Reactize = Reactize;
