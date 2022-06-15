![NPM Downloads](https://img.shields.io/npm/dm/@fawazahmed/js-infinite-median) ![NPM License](https://img.shields.io/npm/l/@fawazahmed/js-infinite-median) ![NPM Version](https://img.shields.io/npm/v/@fawazahmed/js-infinite-median)

# js-infinite-median
## TS/JS compatible
Calculate median of a stream of numbers using heap sort (with nlogn comlpexity)

### Installation

```
npm i @fawazahmed/js-infinite-median --save
```

or with yarn

```
yarn add @fawazahmed/js-infinite-median
```

### Usage

```javascript
import { InfiniteMedian } from '@fawazahmed/js-infinite-median';
// Using require:
// const { InfiniteMedian } = require("@fawazahmed/js-infinite-median")

// Create an instance of InfiniteMedian class
const instance = new InfiniteMedian()

// keep adding numbers from stream
instance.insert(1)
instance.insert(2)
instance.insert(3)
instance.insert(4)
instance.insert(5)

// fetch the median from instance
const median = instance.getMedian()
// median has a value 5
```

### Credits
- I would like to thank members of stackoverflow who posted relevant answers on [this thread](https://stackoverflow.com/questions/10657503/find-running-median-from-a-stream-of-integers)
- Creators of this amazing [package](https://www.npmjs.com/package/@datastructures-js/heap) for heap algo

### Applications
- Typically to fetch the median price of any stock/crypto/fiat or any other trades out there, this lib can be used, where you get stream of data and process in real time.

### Drawbacks
- Since the instance remains in memory, eventually the data will outgrow and crash the app due to memory overflow. To overcome this, there can be another wrapper or some code modification to remove a subset of data from memory periodically.
