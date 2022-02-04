import path from 'path';
import { JsonToXml } from './main';
import { Transform } from './server';
import test from './test.json';
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
const testString: string = JSON.stringify(test);
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
/** Summary.
 *
 * Description.
 *
 * @throws {Exception}
 * @param {string} paramName - Param description (e.g. "add", "edit").
 * @returns {Object} The return description.
 */
describe('Transform', () => {
  it('should not fail trying to read transform and write a a XML file from a Json file.', () => {
    var testPath: string = path.join(__dirname, 'test.json');
    Transform(testPath);
  })
})
