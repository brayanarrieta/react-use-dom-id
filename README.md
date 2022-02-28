# react-use-dom-id

Library to generate unique and deterministic ids for React components.
## Install

### NPM

```
npm i --save react-use-dom-id
```

### Yarn

```
yarn add react-use-dom-id
```

## Usage

### useId Hook (React Functional Components)

**Hook** that returns a unique and deterministic id per component or element.

```javascript
import React from "react";
import { useId } from "react-use-dom-id";

const RadioButton = ({ children, ...rest }) => {
  const radioButtonId = useId('my-prefix');

  return (
    <div>
      <label htmlFor={radioButtonId}>{children}</label>
      <input id={radioButtonId} type="radio" {...rest} />
    </div>
  );
};
```

### useIdContext Hook (React Functional Components)

**Hook** that returns some methods provided by the useIdContext. The **generateId** method could be used to generate unique ids. When we provide a **context namespace prefix** as param for the **useIdContext** hook, will override the default namespace prefix, so every time that the generateId is called will be incorporated to the unique ids generated with it.

```javascript
import React from "react";
import { useIdContext } from "react-use-dom-id";

const RadioButton = ({ children, ...rest }) => {
  const 
  const { generateId } = useIdContext('my-prefix');
  const id = generateId();

  return (
    <div>
      <label htmlFor={radioButtonId}>{children}</label>
      <input id={id} type="radio" {...rest} />
    </div>
  );
};
```

### withUseIdContext HOC

**HOC** that integrate some new props to the React Components. The **generateId** method could be used to generate unique ids. When we provide a **context namespace prefix** as first param for the **withUseIdContext** HOC, will override the default namespace prefix, so every time that the generateId is called will be incorporated to the unique ids generated with it.

```javascript

import React, { Component } from 'react';
import { withUseIdContext } from 'react-use-dom-id';

class RadioButton extends Component {
  render() {
    const { generateId } = this.props.useIdContext;
    const id = generateId();

    <div>
      <label htmlFor={radioButtonId}>{children}</label>
      <input id={id} type="radio" {...rest} />
    </div>
  }
}

export default withUseIdContext('my-prefix')(RadioButton);
```

## API

### useId(namespacePrefix?: string | undefined): string | null;

| **Arguments**   | **Type** | **Required?** | **Default** | **Description**                          |
|-----------------|----------|---------------|-------------|------------------------------------------|
| namespacePrefix | string   | No            | app         | Allows provide a custom namespace prefix |

### useIdContext(namespacePrefixContext?: string | undefined): { generateId }

| **Arguments**   | **Type** | **Required?** | **Default** | **Description**                          |
|-----------------|----------|---------------|-------------|------------------------------------------|
| namespacePrefixContext | string   | No            | app         | Allows provide a custom context namespace prefix that will be incorporated to the unique ids  |

### generateId(namespacePrefix?: string | undefined): string;

| **Arguments**   | **Type** | **Required?** | **Default** | **Description**                          |
|-----------------|----------|---------------|-------------|------------------------------------------|
| namespacePrefix | string   | No            | app         | Allows provide a custom namespace prefix, can be use to override also the custom namespace prefix in the useIdContext hook and withUseIdContext HOC |


### withUseIdContext(namespacePrefixContext?: string | undefined): (Component: React.ComponentType<any>): JSX.Element

| **Arguments**   | **Type** | **Required?** | **Default** | **Description**                          |
|-----------------|----------|---------------|-------------|------------------------------------------|
| namespacePrefixContext | string   | No            | app         | Allows provide a custom context namespace prefix that will be incorporated to the unique ids  |
| Component | React Component  | Yes            | N/A         | Component that will consumer the new feature incorporated by the withUseIdContext HOC  |