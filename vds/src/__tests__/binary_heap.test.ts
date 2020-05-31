import Heap from '../alogrithm/heap/binary_heap';

describe('heap', () => {
    
    test('big heap', () => {
        
        // let heap = new Heap<TestModel>(false, (target: TestModel, source: TestModel) => {
        //     return target.weight > source.weight;
        // });

        // heap.add(new TestModel('a',16));
        // heap.add(new TestModel('b',14));
        // heap.add(new TestModel('c',10));
        // heap.add(new TestModel('d',9));
        // heap.add(new TestModel('e',7));
        // heap.add(new TestModel('g',8));
        // heap.add(new TestModel('h',3));
        // heap.add(new TestModel('l',6));
        // heap.add(new TestModel('k',2));
        // heap.add(new TestModel('m',1));

        // console.log('print heap:');
        // heap.print();

        // console.log('remove element');
        // heap.remove();

        // console.log('after remove element, print heap:');
        // heap.print();

    });

});

class TestModel {
    weight: number;
    name: string;
    constructor(name: string, weight: number) {
        this.weight = weight;
        this.name = name;
    }
}