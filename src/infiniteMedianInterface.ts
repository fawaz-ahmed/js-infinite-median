import { MinHeap } from "@datastructures-js/heap";

export interface InfiniteMedianInterface {
  min: MinHeap<number>;
  max: MinHeap<number>;
  firstNode: number;
  secondNode: number;
  initialNodesProcessed: boolean;

  insert: (node:number) => void;

  getMedian: () => number;
}