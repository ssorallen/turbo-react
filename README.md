# turbo-react

This is a mix of React, React's JSX, and a slightly-modified Turbolinks
that applies DOM "diffs" without any server configuration—it just
needs plain old HTML.

**Demo:** https://turbo-react.herokuapp.com/

### What it's doing

"Re-request this page" is just a link to the current page. When you click it,
Turbolinks intercepts the GET request and fetchs the full page via XHR.

The panel is rendered with a random panel- class on each request,
and the progress bar gets a random widthX class.

With Turbolinks alone, the entire `<body>` would be replaced, and transitions
would not happen. In this little demo though, React adds and removes
classes and text, and the attribute changes are animated with CSS transitions.
The DOM is otherwise left in tact.

### The Code

Reactize turns the `<body>` into a React element: [reactize.js](https://github.com/ssorallen/turbo-react/blob/master/public/reactize-0.1.0.js)

Reactize is hooked into Turbolinks: [turbolinks-1.4.0.js#L111](https://github.com/ssorallen/turbo-react/blob/master/public/turbolinks-1.4.0.js#L111)

### Feedback

Tweet at me: [@ssorallen](https://twitter.com/ssorallen?rel=author)
