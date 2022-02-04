import { ObjectToXmlDocument } from './main';
/** Summary.
 *
 * Description.
 *
 * @const
 */
const expectedResult: string = `<root><name>Test</name><facts><facts.0>it something</facts.0><facts.1>it some other thing</facts.1></facts><details><details.preformance>true</details.preformance><details.benchmark><details.benchmark.0>1</details.benchmark.0><details.benchmark.1>2</details.benchmark.1><details.benchmark.2>3</details.benchmark.2></details.benchmark></details></root>`;
/** Summary.
 *
 * Description.
 *
 * @const
 */
const test: {} = { name: 'Test', facts: ['it something', 'it some other thing'], details: { preformance: true, benchmark: [ 1, 2, 3] } };
/** Summary.
 *
 * Description.
 *
 * @throws {Exception}
 * @param {string} paramName - Param description (e.g. "add", "edit").
 * @returns {Object} The return description.
 */
describe('ObjectToXmlDocument', () => {
  it('should transform a JsonObject to a XMLDocument', () => {
    var serializer: XMLSerializer = new XMLSerializer();
    var xml = ObjectToXmlDocument(test);
    var xmlString = serializer.serializeToString(xml);
    expect(xmlString).toEqual(expectedResult);
  })
})