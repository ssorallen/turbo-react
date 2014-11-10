/**
 * Reactize v0.2.0
 */
(function(exports) {
  var Reactize = {};

  var CLASS_NAME_REGEX = /\sclass=/g;

  Reactize.reactize = function(element) {
    var code = JSXTransformer.transform(
      "/** @jsx React.DOM */" +
      this.htmlToJsx(element.innerHTML)).code;

    return eval(code);
  };

  Reactize.applyDiff = function(element) {
    var bod = Reactize.reactize(element);
    React.render(bod, document.body);
  };

  Reactize.applyBodyDiff = function() {
    Reactize.applyDiff(document.body)
  };

  // Converts an HTML string into a JSX-compliant string.
  Reactize.htmlToJsx = function(html) {
    return html.replace(CLASS_NAME_REGEX, " className=");
  };

  window.onload = Reactize.applyBodyDiff;

  exports.Reactize = Reactize;
})(window);
