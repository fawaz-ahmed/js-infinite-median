// following pseudo code from here :
// https://stackoverflow.com/questions/10657503/find-running-median-from-a-stream-of-integers
// using heap implementation: https://www.npmjs.com/package/@datastructures-js/heap

import {
  MinHeap,
  MaxHeap,
} from '@datastructures-js/heap';
import { InfiniteMedianInterface } from './infiniteMedianInterface';

export class InfiniteMedian implements InfiniteMedianInterface {
  min = new MinHeap<number>();
  max = new MaxHeap<number>();
  firstNode!: number;
  secondNode!: number
  initialNodesProcessed = false

  insert(node: number) {
    if (!this.initialNodesProcessed) {
      if (this.firstNode === undefined) {
        this.firstNode = node
        return 
      }
      if (this.secondNode === undefined) {
        this.secondNode = node
      }
      // process first 2 nodes
      const [smallerNode, biggerNode] = this.firstNode > this.secondNode
        ? [this.secondNode, this.firstNode]
        : [this.firstNode, this.secondNode]

      this.max.insert(smallerNode) // O(ln n)
      this.min.insert(biggerNode) // O(ln n)
      this.initialNodesProcessed = true
      return
    }

    const maxHeapRoot = this.max.root() // O(1)
    if (node < maxHeapRoot) {
      this.max.insert(node) // O(ln n)
    } else {
      this.min.insert(node) // O(ln n)
    }

    const elementsInMaxheap = this.max.size() // O(1)
    const elementsInMinheap = this.min.size() // O(1)
    const difference = Math.abs(elementsInMaxheap - elementsInMinheap)
    if (difference > 1) {
      // balance heaps
      const [biggerSizeheap, smallerSizeHeap] = elementsInMaxheap > elementsInMinheap
        ? [this.max, this.min]
        : [this.min, this.max]
      const biggerHeapSizeRoot = biggerSizeheap.extractRoot() // O(ln n)
      smallerSizeHeap.insert(biggerHeapSizeRoot) // O(ln n)
    }
  }

  getMedian(): number {
    // edge case when we only have 2 or less points
    if (!this.initialNodesProcessed) {
      if (this.firstNode !== undefined && this.secondNode !== undefined) {
        return (this.firstNode + this.secondNode) / 2
      }
      return this.firstNode
    }

    const elementsInMaxheap = this.max.size() // O(1)
    const elementsInMinheap = this.min.size() // O(1)
    const maxHeapRoot = this.max.root() // O(1)
    const minHeapRoot = this.min.root() // O(1)

    if (elementsInMaxheap === elementsInMinheap) {
      return (maxHeapRoot + minHeapRoot) / 2
    }

    if (elementsInMaxheap > elementsInMinheap) {
      return maxHeapRoot
    }

    return minHeapRoot
  }
}
