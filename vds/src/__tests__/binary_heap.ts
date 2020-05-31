import Heap from '../alogrithm/heap/binary_heap';

describe('heap', () => {
    
    test('big heap', () => {
        
        let heap = new Heap<number>(true);
        heap.add(16);
        heap.add(14);
        heap.add(10);
        heap.add(9);
        heap.add(7);
        heap.add(8);
        heap.add(3);
        heap.add(2);
        heap.add(4);
        heap.add(1);

        console.log('print heap:');
        heap.print();

        console.log('remove element');
        heap.remove();

        console.log('after remove element, print heap:');
        heap.print();

    });

})