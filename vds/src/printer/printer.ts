class Printer {

    static print(elements: Array<any>) {
        if (!elements || elements.length === 0) {
            console.log("[ ]");
            return;
        }
        let sb = '';
        sb += '[';
        let str: string = elements.reduce((pre: any, cur: any) => {
            return pre + "," + cur;
        });
        sb += str;
        sb += ']';
        console.log(sb);
    }


}


export {
    Printer
}