# JsonToXml
Simple way to convert JSON to XML
```js
import 
/** Summary.
 *
 * Description.
 *
 * @const
 */
const expectedResult: string = `<test><name>Test</name><facts><facts.0>it something</facts.0><facts.1>it some other thing</facts.1></facts><details><details.preformance>true</details.preformance><details.benchmark><details.benchmark.0>1</details.benchmark.0><details.benchmark.1>2</details.benchmark.1><details.benchmark.2>3</details.benchmark.2></details.benchmark></details></test>`;
/** Summary.
 *
 * Description.
 *
 * @const
 */
const testString = JSON.stringify(test);
/** Summary.
 *
 * Description.
 *
 * @throws {Exception}
 * @param {string} paramName - Param description (e.g. "add", "edit").
 * @returns {Object} The return description.
 */
describe('ObjectToXmlDocument', () => {
  it('should convert a JsonObject to a XMLDocument.', () => {
    var xmlString = JsonToXml(testString, 'test');
    expect(xmlString).toEqual(expectedResult);
  })
})
```