
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
    var child: Element = rootXml.createElement(Array.isArray(i.parent) ? i.path.split('.').slice(-2).join('.') : i.key);
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
export function IteratorPath(path: string, key: string): string {
    return !path ? key : `${path}.${key}`;
}
/** 
 * Recursive walk of the properties of the given object and exec the given callback.
 *
 * Graph traversal for js arrays and objects.
 *
 * @param {object}              obj       - The object to traverse recursively.
 *                                          NOTE: this changes on every recursion level,
 *                                          so for an object { foo: 'bar' } -> the first recursion
 *                                          [obj] variable will hold the whole given object,
 *                                          the second recursion will explore the property 'foo' and [obj] variable will hold the value 'bar'.
 * @param   {(r: any) => void}  calllback - The function to call on each value of the given object. NOTE: is also called on the root object.
 * @param   {string}            key       - Hold the key of the current property being explored on the graph traversal operation. NOTE: is null on the first recursion.
 * @param   {object}            parent    - Hold the current parent node of the current property being explored on the graph traversal operation.
 * @param   {any}               result    - Hold the result of the last execution of the given callback and provides it for each call on the graph traversal.
 * @returns {void}                      - The correspondent XML string of the given object.
 */
export function WalkObject(obj: any, callback: (r: any) => void, key: string|null = null, path: string = '', parent: any = null, result: any = null): void {
    const value = (key === null) ? obj : (parent[key] || obj);
    result = callback({ value, path, key, parent, result, obj });
    if (typeof(value) !== 'object') return;
    Object.keys(obj).forEach(k => WalkObject(obj[k], callback, k, IteratorPath(path, k), obj, result));
}
