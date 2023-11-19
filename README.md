# react-bubble-cursor

`react-bubble-cursor` is a customizable animated mouse cursor. This started as something I was playing around with in a few projects, and thought it would be nice as a reusable package.

### Note

There is currently no logic to detect mobile devices. This component shouldn't render on mobile devices and custom logic will be needed.

### Features

- position is calculated at 60fps
- customize ring diameter, dot size, ring "drag" and color
- less boring than standard mouse

### TODO

- add custom click/hover interactions
- customizable ring width
- multiple colors
- automatic disabling on mobile devices

### Installation

```
npm install @brandons404/react-bubble-cursor
```

### `BubbleCursor` example

```js
import React from 'react';
import { BubbleCursor } from '@brandons404/react-bubble-cursor';

function App() {
  return (
    <div>
      <BubbleCursor />
      <OtherComponent />
    </div>
  );
}

export default App;
```

### `BubbleCursor` props

| Attribute | Type   | Default | Description                                                      |
| --------- | ------ | ------- | ---------------------------------------------------------------- |
| ringSize  | number | 35      | diameter of the outer ring.                                      |
| dotSize   | number | 8       | size of the inner dot.                                           |
| drag      | number | 20      | amount of "lag" behind the cursor. Higher = slower. 1 for no lag |
| color     | string | #ffffff | any standard css color string.                                   |
