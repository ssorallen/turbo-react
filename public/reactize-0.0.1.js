/**
 * Reactize v0.0.1
 */
(function(exports) {
  var Reactize = {};

  Reactize.reactize = function(element) {
    var code = JSXTransformer.transform(
      "/** @jsx React.DOM */" + element.innerHTML).code;

    return eval(code);
  };

  Reactize.applyDiff = function(element) {
    var bod = Reactize.reactize(element);
    React.renderComponent(bod, document.body);
  };

  Reactize.applyBodyDiff = function() {
    Reactize.applyDiff(document.body)
  };

  window.onload = Reactize.applyBodyDiff;

  exports.Reactize = Reactize;
})(window);
