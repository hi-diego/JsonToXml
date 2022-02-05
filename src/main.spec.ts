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
const expectedResult: string = `<test><name>Test</name><test>it something</test><test>it some other thing</test><details><preformance>true</preformance><details>1</details><details>2</details><details>3</details></details></test>`;
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
