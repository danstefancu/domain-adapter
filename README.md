# domain-adapter
Adapt to usable domain, subdomain and hostname an URL or a domain. Can also be used to validate

## Usage

```js
import DomainAdapter from "domain-adapter";

const d1 = new DomainAdapter();
d1.parse('example.com');
d1.domain // 'example.com'
d1.path // '/'
d1.subdomain // ''
d1.hostname // example.com
d1.valid // true

const d2 = new DomainAdapter();
d2.parse('http://sub.example.com/some-path');
d2.domain // 'example.com'
d2.path // '/some-path'
d2.subdomain // 'sub'
d2.hostname // sub.example.com
d2.valid // true

const d3 = new DomainAdapter();
d3.parse('münchen.de');
d3.domain // 'xn--mnchen-3ya.de'
d3.path // '/'
d3.subdomain // ''
d3.hostname // 'xn--mnchen-3ya.de'
d3.valid // true

const valid = DomainAdapter.valid('example.nonexistent');
// false

// legacy usage:
const d4 = new DomainAdapter('example.com');
d1.domain // 'example.com'
d1.path // '/'
d1.subdomain // ''
d1.hostname // example.com
d1.valid // true

```