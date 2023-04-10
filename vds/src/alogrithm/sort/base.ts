import { ISort }  from "./sort";

class BaseSort implements ISort {

    sort(elements: number[]): void {
        throw new Error("Method not implemented.");
    }

    swap(elements: number[], preIndex: number, postIndex: number) {
        let pre = elements[preIndex];
        let post = elements[postIndex];
        elements[preIndex] = post;
        elements[postIndex] = pre;
    }

}

export {
    BaseSort 
}