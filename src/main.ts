/**
 * Parse the given Json string.
 *
 * Description.
 *
 * @throws {InvalidArgumentException}
 * @param {string} jsonString - The mode being performed (e.g. "add", "edit").
 * @returns {Object} The Object correspondent to the given JsonString.
 */
export function ObjectToXml(obj: {}, root: string = 'root'): string {
    var serializer: XMLSerializer = new XMLSerializer();
    var xml = ObjectToXmlDocument(obj, root);
    var xmlString = serializer.serializeToString(xml);
    return xmlString;
}
/**
 * Parse the given Json string.
 *
 * Description.
 *
 * @throws {InvalidArgumentException}
 * @param {string} jsonString - The mode being performed (e.g. "add", "edit").
 * @returns {Object} The Object correspondent to the given JsonString.
 */
export function JsonToXml(json: string, root: string = 'root'): string {
    var jsonObject = JSON.parse(json);
    return ObjectToXml(jsonObject, root);
}
/** Summary.
 *
 * Description.
 *
 * @throws {Exception}
 * @param {object} obj - Param description (e.g. "add", "edit").
 * @returns {string} The correspondent XML string of the given object.
 */
export function ObjectToXmlDocument(obj: {}, root: string = 'root'): XMLDocument {
    var parser: DOMParser = new DOMParser();
    var xml: XMLDocument = parser.parseFromString(`<${root}></${root}>`, "application/xml");
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
 * @param {object} o - Param description (e.g. "add", "edit").
 * @returns {string} The correspondent XML string of the given object.
 */
export function WalkObject(obj: any, callback: (r: any) => void, key: string|null = null, path: string = '', parent: any = null, result: any = null): void {
    const value = (key === null) ? obj : (parent[key] || obj);
    result = callback({ value, path, key, parent, result, obj });
    if (typeof(value) !== 'object') return;
    Object.keys(obj).forEach(k => WalkObject(obj[k], callback, k, `${path}${ path ? '.' : '' }${k}`, obj, result));
}
