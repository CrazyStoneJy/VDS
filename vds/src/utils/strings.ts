export default class Strings {

    public static notEmoty(text: string) {
        return text && text !== '';
    }

    public static isEmpty(text: string) {
        return !this.notEmoty(text);
    }

    public static toInt(text: string): number {
        if (this.isEmpty(text)) {
            console.warn(`${text} is empty or is undefined.`);
        }
        return parseInt(text);
    }

}