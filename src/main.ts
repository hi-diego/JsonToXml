/**
 * Summary.
 *
 * Description.
 *
 * @member {string}   key        -  Hold the key of the current property being explored on the graph traversal operation. NOTE: is null on the first recursion.
 * @member {object}   parent     -  Hold the current parent node of the current property being explored on the graph traversal operation.
 */
export interface ObjectIteration {
    value: any,
    path: string|null,
    key: string|null,
    parent: any
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
    WalkObject<Element|null>(obj, (i: ObjectIteration, lastResult: Element|null) => ObjectIterationToXmlElement(i, lastResult, xml));
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
export function ObjectIterationToXmlElement(i: ObjectIteration, lastResult: Element|null, rootXml: XMLDocument): Element|null {
    if (!lastResult) return rootXml.documentElement;
    if (Array.isArray(i.value)) return lastResult;
    var childName: string|null = Array.isArray(i.parent) ? lastResult.tagName : i.key;
    var child: Element = rootXml.createElement(childName||'');
    if (typeof(i.value) !== 'object') child.innerHTML = i.value;
    lastResult.appendChild(child);
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
export function IterationPath(path: string|null, key: string|null): string|null {
    return !path ? key : `${path}.${key}`;
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
export function NextIteration(value: any, key: string|null, path: string|null, parent: any): ObjectIteration {
    return { value: value, key, parent, path: IterationPath(path, key) };
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
export function NextIteration_(it: ObjectIteration, key: string): ObjectIteration {
    return { value: it.value[key], key, parent: it.value, path: IterationPath(it.path, key) };
}
/** 
 * Recursive walk of the properties of the given object and exec the given callback.
 *
 * Graph traversal for classic js arrays and js objects.
 * NOTE: it will not work for Maps and sets you will to transform first your map/set to an object or an array.
 *
 * @param {object}                          object_    -  The object to traverse recursively.
 *                                                        NOTE: this changes on every recursion level,
 *                                                        so for an object { foo: 'bar' } -> the first recursion
 *                                                        [obj] variable will hold the whole given object,
 *                                                        the second recursion will explore the property 'foo' and [obj] variable will hold the value 'bar'.
 * @param   {<T>(r: ObjectIteration) => T}  callback   -  The function to call on each value of the given object. NOTE: is also called on the root object.
 * @param   {ObjectIteration}               it         -  The current Object property data to be itreater recursivly.
 * @param   {T|null}                        lastResult -  Hold the result of the last execution of the given callback and provides it for each call on the graph traversal.
 * @returns {void}                                     -  The correspondent XML string of the given object.
 */
export function WalkObject<T>(object_: any, callback: (i: ObjectIteration, lastResult: T|null) => T|null, i: ObjectIteration|null = null, lastResult: T|null = null): void {
    // value variable will hold the value of the current property being explored.
    // So if this is the first run it will hold the root object
    // but for the next recurtions it will hold the value of the parent in the current key being explored: parent[key].
    var it: ObjectIteration = i === null ? { value: object_, path: null, key: null, parent: null } : i;
    // lastResult will hold the return value of the callback in each recursion. NOTE: on the first recurtion lastResult is null;
    lastResult = callback(it, lastResult);
    // If current value is Walkable (if it is an array or an object): we walk the object recursivly. In js typeof([]) === typeof({}) === typeof(null) so we typecheck;
    if (typeof(it.value) !== 'object' && it.value !== null) return;
    // Array and Objects can be iterable through Object.keys(value) so: for each key of the value we walk recursivly.
    // NOTE: Object.keys(['a', 'b', 'c']) === [0, 1, 2], and for common objects: Object.keys({a: 0, b: 1, c: 2}) is ['a', 'b': 'c'].
    Object.keys(object_).forEach(key => WalkObject(object_[key], callback, NextIteration_(it, key), lastResult));
}
