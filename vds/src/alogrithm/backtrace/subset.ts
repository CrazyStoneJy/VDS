export default class SubSet {

    res = new Array();

    traverse(nums: Array<number>): Array<any> {
        this.backTrack(nums, [], 0);
        return this.res;
    }

    backTrack(nums: Array<number>, list: Array<number>, start: number): void {
        this.res.push(JSON.parse(JSON.stringify(list)));
        for (let i = start; i < nums.length; i++) {
            list.push(nums[i]);
            this.backTrack(nums, list, i + 1);
            list.pop();
        }
    }

}