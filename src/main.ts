/**
 * Summary.
 *
 * Description.
 */
export interface ObjectIteration {
    value: string,
    path: string|null,
    key: string|null,
    parent: any,
    lastResult: any
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
/**
 * Transform an ObjectIteration to its corresponednt XmlElement and appends it to its father for each graph traversal operation.
 *
 *
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
/**
 * Returns the correspondent js dot separated path of the current graph traversal iteration.
 *
 * Example: for the property bar in { foo: { bar: 'baz' } } we need to return the last path + . + key.
 * If path is null: (ex: for the root object) it will return the current key being explored.
 *
 * @param   {string|null}   path - Full path of the current property being explored recursivly.
 * @param   {string}         key - Name of the current property being explored recursivly.
 * @returns {string}           - The correspondent path of the current iteration.
 */
export function IteratorPath(path: string|null, key: string): string {
    return !path ? key : `${path}.${key}`;
}
/** 
 * Recursive walk of the properties of the given object and exec the given callback.
 *
 * Graph traversal for classic js arrays and js objects.
 * NOTE: it will not work for Maps and sets you will to transform first your map/set to an object or an array.
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
export function WalkObject<ReturnType>(
    obj: any,
    callback: (i: ObjectIteration) => ReturnType,
    key: string|null = null,
    path: string|null = null,
    parent: any = null,
    lastResult: ReturnType|null = null
): void {
    // value variable will hold the value of the current property being explored.
    // So if this is the first run it will hold the root object
    // but for the next recurtions it will hold the value of the parent in the current key being explored: parent[key].
    const value = (key === null) ? obj : (parent[key] || obj);
    // lastResult will hold the return value of the callback in each recursion. NOTE: on the first recurtion lastResult is null;
    lastResult = callback({ value, path, key, parent, lastResult });
    // If current value is Walkable (if it is an array or an object): we walk the object recursivly. In js typeof([]) === typeof({}) === typeof(null) so we typecheck;
    if (typeof(value) !== 'object' && value !== null) return;
    // Array and Objects can be iterable through Object.keys(value) so: for each key of the value we walk recursivly.
    // NOTE: Object.keys(['a', 'b', 'c']) === [0, 1, 2], and for common objects: Object.keys({a: 0, b: 1, c: 2}) is ['a', 'b': 'c'].
    Object.keys(obj).forEach(k => WalkObject(obj[k], callback, k, IteratorPath(path, k), obj, lastResult));
}
