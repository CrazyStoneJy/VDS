export default describe('demo', () => {

    test('demo test', () => {
        foo(4);
    });

    function foo(n: number) {
        if (n < 5) {
            n = 10;
        } else if (n > 6) {
            console.log('n > 6,n is:', n);
        } else {
            console.log('n:', n);
        }
    }

});