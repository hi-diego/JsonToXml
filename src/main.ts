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
/** Summary.
 *
 * Description.
 *
 * @throws {Exception}
 * @param {object} obj - Param description (e.g. "add", "edit").
 * @returns {string} The correspondent XML string of the given object.
 */
export function ObjectToXmlDocument(obj: {}): string {
    var xml: XMLDocument = (new DOMParser()).parseFromString('<root></root>', "application/xml");
    WalkObject(obj, (i: any) => {
        if (!i.result) return xml.documentElement;
        console.log(i);
        var child: Element = xml.createElement(i.path);
        child.innerHTML = i.value;
        i.result.appendChild(child);
        return child;
    });
    var serializer: XMLSerializer = new XMLSerializer();
    // console.log(xml);
    return serializer.serializeToString(xml);
}
/** Summary.
 *
 * Description.
 *
 * @throws {Exception}
 * @param {object} obj - Param description (e.g. "add", "edit").
 * @returns {string} The correspondent XML string of the given object.
 */
export function ObjectToXmlString(obj: {}): string {
    var xml: string = '';
    WalkObject(obj, (i: any) => (xml = ValueToXmlString(i, xml)));
    return xml.replace('~', '');
}
/** Summary.
 *
 * Description.
 *
 * @throws {Exception}
 * @param {object} obj - Param description (e.g. "add", "edit").
 * @returns {string} The correspondent XML string of the given object.
 */
export function ValueToXmlString(i: any, xml: string): string {
    if (!i.key) return `<root>~</root>`;
    return xml.replace('~', Array.isArray(i.value) ? `<${i.key}>~</${i.key}>` : `<${i.path}>${i.value}</${i.path}>~`);
}
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
 * @param {object} o - Param description (e.g. "add", "edit").
 * @returns {string} The correspondent XML string of the given object.
 */
export function WalkObject(o: any, callback: (r: any) => void, key: string|null = null, path: string = '', parent: any = null, result: any = null): void {
    const value = (key === null) ? o : (o[key] || o);
    result = callback({ value, path, key, parent, result });
    if (typeof(value) === 'object') {
        for (const k of Object.keys(o)) WalkObject(o[k], callback, k, `${path}${ path ? '.' : '' }${k}`, o, result);
    }
}
const test = { name: 'Test', facts: ['it something', 'it some other thing'], details: { preformance: true } };
// WalkObject(test, (i: any) => console.log(i));
// console.log(JSON.stringify(test));
// console.log(ObjectToXmlString(test));
console.log(ObjectToXmlDocument(test));