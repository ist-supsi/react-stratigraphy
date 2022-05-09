# React Stratigraphy

<img src="https://img.shields.io/npm/l/@ist-supsi/stratigraphy">
<img src="https://img.shields.io/npm/v/@ist-supsi/stratigraphy">
<img src="https://img.shields.io/bundlephobia/minzip/@ist-supsi/stratigraphy">

<br/>
<br/>

A simple reactjs module for creating graphical representations of stratigraphies (used in geology to describe the vertical location of rock units).


Example:

<img src="assets/screenshot.gif" alt="Printscreen" width="250px">

<br/>
<br/>

## Installation

Install the module with npm:

```
npm install @ist-supsi/stratigraphy
```

or use yarn:

```
yarn add @ist-supsi/stratigraphy
```

## Usage

```javascript

import React from 'react';
import { Stratigraphy } from '@ist-supsi/stratigraphy';

const ExampleComponent = props => {
  return (
    <Stratigraphy
      data={
        [
          {
            id: 1,
            from: 0,
            to: 1.23,
            color: '#123456',
            pattern: 'assets/pattern-1.png',
            title: 'Jura des Juragebirges',
            subtitle: 'Dazit'
          }, {
            id: 2,
            from: 1.23,
            to: 1.77,
            color: '#789123',
            pattern: 'assets/pattern-2.png',
            title: 'Quartar, undifferenziert',
            subtitle: 'Phonolith'
          }, {
            id: 3,
            from: 1.77,
            to: 2.34,
            color: '#456789',
            pattern: 'assets/pattern-3.png',
            title: 'Altere Ablagerungen, undifferenziert',
            subtitle: 'Magmatit'
          }
        ]
      }
      onSelected={(layer)=>{
        console.log(layer);
      }}
      style={{
        height: '300px',
        width: '250px'
      }}
      unit='m'
    />
  );
};

export default ExampleComponent;

```

## Dev corner

### Run dev Server

```bash
docker run --rm -it \
    -v $PWD:/app \
    -w /app \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    --network="host" \
    node:16.13.1-alpine3.14 \
    npm start
```


### Build the library

```bash
docker run --rm -it \
    -v $PWD:/app \
    -w /app \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    --network="host" \
    node:16.13.1-alpine3.14 \
        npm start
```


### Watch the library for changes

```bash
docker run --rm -it \
    -v $PWD:/app \
    -w /app \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    --network="host" \
    node:16.13.1-alpine3.14 \
        npm run build-watch
```