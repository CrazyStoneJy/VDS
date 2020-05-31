export default class Strings {

    public static notEmoty(text: string) {
        return text && text !== '';
    }

    public static isEmpty(text: string) {
        return !this.notEmoty(text);
    }
}