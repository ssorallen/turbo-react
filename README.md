# TurboReact

TurboReact applies only the differences between two HTML pages when navigating
with links rather than create a new document, which enables CSS transitions
between pages without needing a server.

## Installation & Usage

TurboReact is a plugin for [Turbolinks](https://github.com/rails/turbolinks),
which means Turbolinks is required. Include both Turbolinks and TurboReact in
the `<head>` of every document on your site. If you're using Jekyll (GitHub
Pages), use a layout in the `_layouts` directory to write the script tag only
once.

1. Get turbo-react via NPM or download the latest release from GitHub:

        npm install turbo-react

  or

      curl https://raw.githubusercontent.com/ssorallen/turbo-react/tree/v0.8.0/public/dist/turbo-react.min.js

2. Include turbo-react in the `<head>` of each page of the site:

    ```html
    <!DOCTYPE html>
    <html>
      <head>
        ...
        <script src="path/to/turbolinks.js"></script>
        <script src="path/to/turbo-react.min.js"></script>
      </head>
      <body>
        ...
      </body>
    </html>
    ```

### Opting out of Turbolinks & TurboReact

Add a
[`data-no-turbolink` attribute](https://github.com/rails/turbolinks#opting-out-of-turbolinks)
to any link that should load normally without being intercepted by Turbolinks
and TurboReact. This feature is inherited from TurboReacts's use of Turbolinks.

```html
<a href="/foo/bar.html" data-no-turbolink>
  Skip Turbolinks and TurboReact
</a>
```

## Examples

### Transitioning Background Colors

Navigating between page1 and page2 shows a skyblue background and a yellow
background that changes at once. After putting TurboReact in the `<head>`,
navigating between the pages will transition between the background colors
because TurboReact will add and remove the class names rather than start a new
document.

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

TurboReact turns the `<body>` into a React element and re-renders it after
Turbolinks intercepts link navigations via XMLHttpRequest:
[turbo-react.js](https://github.com/ssorallen/turbo-react/blob/master/src/turbo-react.js)

#### Running locally

1. Clone this repo

        $ git clone https://github.com/ssorallen/turbo-react.git

2. Install dependencies

        $ bundle install
        $ npm install

3. Run the server and watch JS changes

        $ bundle exec unicorn
        $ npm run-script watch

4. Visit the app: [http://localhost:9292](http://localhost:9292)

### Feedback

Tweet at me: [@ssorallen](https://twitter.com/ssorallen?rel=author)
