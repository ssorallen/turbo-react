(function() {
  React.reactize = function(element) {
    var code = JSXTransformer.transform(
      "/** @jsx React.DOM */" + element.innerHTML).code;

    return eval(code);
  };

  React.applyDiff = function(element) {
    var bod = React.reactize(element);
    React.renderComponent(bod, document.body);
  };

  React.applyBodyDiff = function() {
    React.applyDiff(document.body)
  };

  window.onload = React.applyBodyDiff;
})();
