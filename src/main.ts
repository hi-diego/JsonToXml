
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
    if (!i.lastResult) return rootXml.documentElement;
    if (Array.isArray(i.value)) return i.lastResult;
    var childElementName: string = Array.isArray(i.parent) ? i.lastResult.tagName : i.key;
    var child: Element = rootXml.createElement(childElementName);
    if (typeof(i.value) !== 'object') child.innerHTML = i.value;
    i.lastResult.appendChild(child);
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
 * @param {object}              obj        - The object to traverse recursively.
 *                                           NOTE: this changes on every recursion level,
 *                                           so for an object { foo: 'bar' } -> the first recursion
 *                                           [obj] variable will hold the whole given object,
 *                                           the second recursion will explore the property 'foo' and [obj] variable will hold the value 'bar'.
 * @param   {(r: any) => void}  callback   - The function to call on each value of the given object. NOTE: is also called on the root object.
 * @param   {string}            key        - Hold the key of the current property being explored on the graph traversal operation. NOTE: is null on the first recursion.
 * @param   {object}            parent     - Hold the current parent node of the current property being explored on the graph traversal operation.
 * @param   {any}               lastResult - Hold the result of the last execution of the given callback and provides it for each call on the graph traversal.
 * @returns {void}                         - The correspondent XML string of the given object.
 */
export function WalkObject(
    obj: any,
    callback: (r: any) => void,
    key: string|null = null,
    path: string = '',
    parent: any = null,
    lastResult: any = null
): void {
    // value variable will hold the value of the current property being explored.
    // So if this is the first run it will be the given object
    // but for the next recurtions it will be the the value that holds the parent in the current key baing explored: parent[key].
    const value = (key === null) ? obj : (parent[key] || obj);
    // lastResult will hold the return value of the callback in each recursion. NOTE: on the first recurtion lastResult is null;
    lastResult = callback({ value, path, key, parent, lastResult });
    // If current value is Walkable (if it is an array or an object): we walk the object recursivly. In js typeof([]) === typeof({}) === typeof(null) so we typecheck;
    if (typeof(value) !== 'object' && value !== null) return;
    // Array and Objects can be iterable through Object.keys(value) so: for each key of the value we walk recursivly.
    // NOTE: Object.keys(['a', 'b', 'c']) === [0, 1, 2], and for common objects: Object.keys({a: 0, b: 1, c: 2}) is ['a', 'b': 'c'].
    Object.keys(obj).forEach(k => WalkObject(obj[k], callback, k, IteratorPath(path, k), obj, lastResult));
}
