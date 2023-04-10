// import { NQueen } from '../alogrithm/backtrace/queen_n';
import SubSet from '../alogrithm/backtrace/subset';
import Permutation from '../alogrithm/backtrace/permutation';
import { Printer } from '../printer/printer';

let nums = [1, 2, 3];
describe('backtrace', ()=> {

    test('subset', () => {
        // let queen = new NQueen();
        let subset = new SubSet();
        let res = subset.traverse(nums);
        console.log(res);
    });

    test('permutation', () => {
        // let queen = new NQueen();
        let permutation = new Permutation();
        let res = permutation.traverse(nums);
        console.log(res);
    });

})