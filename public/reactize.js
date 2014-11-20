/**
 * Reactize v0.3.0
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

  Reactize.applyDiff = function(current_element, new_element) {
    var bod = Reactize.reactize(new_element);
    React.render(bod, current_element);
  };

  Reactize.applyBodyDiff = function() {
    Reactize.applyDiff(document.body, document.body)
  };

  // Converts an HTML string into a JSX-compliant string.
  Reactize.htmlToJsx = function(html) {
    return html.replace(CLASS_NAME_REGEX, " className=");
  };

  Reactize.version = "0.3.0";

  window.onload = Reactize.applyBodyDiff;

  exports.Reactize = Reactize;
})(window);
