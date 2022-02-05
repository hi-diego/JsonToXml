# JsonToXml
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
//   <facts>
//     <facts.0>it something</facts.0>
//     <facts.1>it some other thing</facts.1>
//   </facts>
//   <details>
//     <preformance>true</preformance>
//     <benchmark>
//       <benchmark.0>1</benchmark.0>
//       <benchmark.1>2</benchmark.1>
//       <benchmark.2>3</benchmark.2>
//     </benchmark>
//   </details>
// </test>
```