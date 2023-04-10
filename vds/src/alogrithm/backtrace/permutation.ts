export default class Permutation { 

    res = new Array();
    traverse(nums: Array<number>): Array<any> {
        this.backTrack(nums, []);
        return this.res;
    }

    backTrack(nums: Array<number>, list: Array<number>): void {
        if (list.length == nums.length) {
            this.res.push(JSON.parse(JSON.stringify(list)));
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            // if has same element should continue.
            if (list.includes(nums[i])) {
                continue;
            }
            list.push(nums[i]);
            this.backTrack(nums, list);
            list.pop();
        }
    }

}