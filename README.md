# turbo-react

turbo-react applies only the differences between two HTML pages when navigating
with links rather than create a new document, which enables CSS transitions
between pages without needing a server.

## Examples

### Transitioning Background Colors

Navigating between page1 and page2 shows a skyblue background and a yellow background that changes at once. After putting Reactize in the `<head>`, navigating between the pages will transition between the background colors because Reactize will add and remove the class names rather than start a new document.

```css
/* style.css */

body {
  height: 100%;
  margin: 0;
  transition: background-color 0.5s;
  width: 100%;
}

.bg-skyblue {
  background-color: skyblue;
}

.bg-yellow {
  background-color: yellow;
}
```

```html
<!-- page1.html -->

<body class="bg-skyblue">
  <a href="page2.html">Page 2</a>
</body>
```

```html
<!-- page2.html -->

<body class="bg-yellow">
  <a href="page1.html">Page 1</a>
</body>
```

### How it Works

**Demo:** https://turbo-react.herokuapp.com/

"Re-request this page" is just a link to the current page. When you click it,
Turbolinks intercepts the GET request and fetchs the full page via XHR.

The panel is rendered with a random panel- class on each request,
and the progress bar gets a random widthX class.

With Turbolinks alone, the entire `<body>` would be replaced, and transitions
would not happen. In this little demo though, React adds and removes
classes and text, and the attribute changes are animated with CSS transitions.
The DOM is otherwise left in tact.

### The Code

Reactize turns the `<body>` into a React element: [reactize.js](https://github.com/ssorallen/turbo-react/blob/master/src/reactize.js)

Reactize is hooked into Turbolinks: [reactize.js#32](https://github.com/ssorallen/turbo-react/blob/master/src/reactize.js#L32)


#### Running locally

1. Clone this repo

        $ git clone git@github.com:ssorallen/turbo-react.git

2. Install dependencies

        $ bundle install
        $ npm install

3. Run the server and watch JS changes

        $ bundle exec unicorn
        $ webpack --progress --colors --watch

4. Visit the app: [http://localhost:9292](http://localhost:9292)

### Feedback

Tweet at me: [@ssorallen](https://twitter.com/ssorallen?rel=author)
