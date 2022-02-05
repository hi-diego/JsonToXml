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
console.log(xmlString); // will log the following xml
// <test><name>Test</name><facts><facts.0>it something</facts.0><facts.1>it some other thing</facts.1></facts><details><details.preformance>true</details.preformance><details.benchmark><details.benchmark.0>1</details.benchmark.0><details.benchmark.1>2</details.benchmark.1><details.benchmark.2>3</details.benchmark.2></details.benchmark></details></test>
```