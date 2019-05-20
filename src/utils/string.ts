
export class StringUtils {

    public static addSlashes(text = ''): string {
        return (text + '')
            .replace(/[\\"']/g, '\\$&')
            .replace(/\u0000/g, '\\0')
    }

}
