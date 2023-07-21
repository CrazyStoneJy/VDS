class Cell {

    num: number;
    isShowNum: boolean;
    isShowBlock: boolean;

    constructor(num: number, isShowNum: boolean, isShowBlock: boolean) {
        this.num = num;
        this.isShowNum = isShowNum;
        this.isShowBlock = isShowBlock;
    }

    toString() {
        return this.num;
    }
}

export default Cell;