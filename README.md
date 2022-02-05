# json-to-xml
Simple way to convert JSON to XML
```js
import { ObjectToXml } from 'json-to-xml';

const object = {
  "name": "Test",
  "facts": [
    "it something",
    "it some other thing"
  ],
  "details": {
    "preformance": true,
    "benchmark": [
      1,
      2,
      3
    ]
  }
};
var xmlString = ObjectToXml(object, 'test');
console.log(xmlString);
// <test>
//   <name>Test</name>
//   <test>it something</test>
//   <test>it some other thing</test>
//   <details>
//     <preformance>true</preformance>
//     <details>1</details>
//     <details>2</details>
//     <details>3</details>
//   </details>
// </test>
```