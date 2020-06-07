# squarejs
>A lightweight JavaScript image viewer

## Getting Started
```
Give examples
```

### Installation

In browser:
```
<link  href="/path/to/square.css" rel="stylesheet">
<script src="/path/to/square.js"></script>
```

### Usage

#### Syntax
```
new Square(selector[, options]);
```

- **selector**
  - Type: `id|class`
  - The target image or container of images for viewing.

- **options** (optional)
  - Type: `Object`
  - The options for viewing. Check out the available [options](#options).

### Example

```
<ul id="images">
    <li><img src="picture-1.jpg" alt="Picture 1" data-image-large="picture-large-1.jpg"></li>
    <li><img src="picture-2.jpg" alt="Picture 2" data-image-large="picture-large-2.jpg"></li>
    <li><img src="picture-3.jpg" alt="Picture 3" data-image-large="picture-large-3.jpg"></li>
</ul>
```

### Keyboard support
> Only available in modal mode.

- `Esc`: Close modal mode.
- `←`: View the previous image.
- `→`: View the next image.

### Options

You may set viewer options with new Viewer(image, options).


### background
- Type: `String`
- Default: `rgba(0, 0, 0, 0.6)`

Change modal background color

### responsive
- Type: `Boolean`
- Default: `true`

Enable image responsive

### width
- Type: `800`
- Default: `true`

Max width of the image in modal

### height
- Type: `Number`
- Default: `600`

Max height of the image in modal

### controls
- Type: `Boolean`
- Default: `true`

Enable preview controls previous and next

### preloader
- Type: `Boolean`
- Default: `true`

Enable preloader when request image

### showTitle
- Type: `Boolean`
- Default: `false`

Enable title image(alt|title)

### disableShortcuts
- Type: `Boolean`
- Default: `false`

Enable shortcuts

### close
- Type: `String` or `Number` 
- Default: `Escape`

Shortcut to close modal

### next
- Type: `String` or `Number` 
- Default: `39`

Shortcut to next image

### prev
- Type: `String` or `Number` 
- Default: `37`

Shortcut to previous image