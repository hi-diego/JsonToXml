/**
 * Parse the given Json string.
 *
 * Description.
 *
 * @throws {InvalidArgumentException}
 * @param {string} jsonString - The mode being performed (e.g. "add", "edit").
 * @returns {Object} The Object correspondent to the given JsonString.
 */
export function ParseJsonOrFail(jsonString: string) : {} {
    try {
        return JSON.parse(jsonString);
    } catch (e) {
        throw new Error('InvalidArgumentException');
    }
}
/** Summary.
 *
 * Description.
 *
 * @throws {Exception}
 * @param {object} obj - Param description (e.g. "add", "edit").
 * @returns {string} The correspondent XML string of the given object.
 */
export function ObjectToXmlDocument(obj: {}): XMLDocument {
    var parser: DOMParser = new DOMParser();
    var xml: XMLDocument = parser.parseFromString('<root></root>', "application/xml");
    WalkObject(obj, (i: any) => ObjectIterationToXmlElement(i, xml));
    return xml; 
}
/** Summary.
 *
 * Description.
 *
 * @throws {Exception}
 * @param {object} obj - Param description (e.g. "add", "edit").
 * @returns {string} The correspondent XML string of the given object.
 */
export function ObjectIterationToXmlElement(i: any, rootXml: XMLDocument): any {
    if (!i.result) return rootXml.documentElement;
    var child: Element = rootXml.createElement(i.path);
    if (typeof(i.value) !== 'object') child.innerHTML = i.value;
    i.result.appendChild(child);
    return child;
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
export function WalkObject(obj: any, callback: (r: any) => void, key: string|null = null, path: string = '', parent: any = null, result: any = null): void {
    const value = (key === null) ? obj : (parent[key] || obj);
    result = callback({ value, path, key, parent, result, obj });
    if (typeof(value) === 'object') {
        // for (const k of Object.keys(obj)) WalkObject(obj[k], callback, k, `${path}${ path ? '.' : '' }${k}`, obj, result);
        Object.keys(obj).forEach(k => WalkObject(obj[k], callback, k, `${path}${ path ? '.' : '' }${k}`, obj, result));
    }
}
const test = { name: 'Test', facts: ['it something', 'it some other thing'], details: { preformance: true, benchmark: [ 1, 2, 3] } };
// WalkObject(test, (i: any) => console.log(i));
// console.log(JSON.stringify(test));
// console.log(ObjectToXmlString(test));
var serializer: XMLSerializer = new XMLSerializer();
var xml = ObjectToXmlDocument(test);
var xmlString = serializer.serializeToString(xml);
console.log(xml, xmlString);