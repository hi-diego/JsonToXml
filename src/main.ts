// /**
//  * Parse the given Json string.
//  *
//  * Description.
//  *
//  * @throws {InvalidArgumentException}
//  * @param {string} jsonString - The mode being performed (e.g. "add", "edit").
//  * @returns {Object} The Object correspondent to the given JsonString.
//  */
// export function ParseJsonOrFail(jsonString: string) : {} {
//     try {
//         return JSON.parse(jsonString);
//     } catch (e) {
//         throw new Error('InvalidArgumentException');
//     }
// }
// /** Summary.
//  *
//  * Description.
//  *
//  * @throws {Exception}
//  * @param {object} obj - Param description (e.g. "add", "edit").
//  * @returns {string} The correspondent XML string of the given object.
//  */
// export function ObjectToXmlString(obj: {}): string {
//     var xml: string = '';
//     for (const key in Object.keys(obj)) {
//         xml += `<${key}>${xml}<${key}>`;
//         xml += `<${key}>${obj[key]}<${key}>`;
//     }
//     return xml;
// }
// /** Summary.
//  *
//  * Description.
//  *
//  * @throws {Exception}
//  * @param {object} obj - Param description (e.g. "add", "edit").
//  * @returns {string} The correspondent XML string of the given object.
//  */
// export function ObjectToXmlString_(obj: any): string {
//     var xml: string = '';
//     Object.keys(obj).map((key: string) => `<${key}>${obj[key]}<${key}>`);
//         // xml += `<${key}>${xml}<${key}>`;
//     return xml;
// }
// /** Summary.
//  *
//  * Description.
//  *
//  * @throws {Exception}
//  * @param {object} obj - Param description (e.g. "add", "edit").
//  * @returns {string} The correspondent XML string of the given object.
//  */
// export function XmlStringValueFromObjectKey(obj: any, key: string): string {
//     const value = obj[key];
//     return value + `<${key}>${value}<${key}>`;
// }
/** Summary.
 *
 * Description.
 *
 * @throws {Exception}
 * @param {object} obj - Param description (e.g. "add", "edit").
 * @returns {string} The correspondent XML string of the given object.
 */
export function WalkObject(obj: any, callback: (r: any) => void, key: string|null = null, path: string = ''): void {
    // for (const key in Object.keys(obj)) {
    callback({value: obj, path});
    const value = (key === null) ? obj : (obj[key] || obj);
    // console.log(obj, typeof(obj), key)
    if (typeof(value) === 'object') {
        // const iterations = [...(obj)];
        for (const k of Object.keys(obj)) WalkObject(obj[k], callback, k, `${path}.${k}`);
        // console.log(obj, typeof(obj), Object.keys(obj))
        // iterations.forEach(i => WalkObject(o, callback));
        // callback();
    }
}
const test = { name: 'Test', facts: ['it something', 'it some other thing'] };
WalkObject(test, (r: any) => console.log(r));