<h1 align="center">Welcome to protectedtext-api 👋</h1>
<p>
  <p align="center">
  <img src="https://ostechnix.com/wp-content/uploads/2018/11/protected-text.png" />
</p>
<img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
<p>
  <a href="https://github.com/pabloskubert/protectedtext-api#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/pabloskubert/protectedtext-api/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/pabloskubert/protectedtext-api/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/pabloskubert/protectedtext-api" />
  </a>
  <a href="https://twitter.com/pabloskubert" target="_blank">
    <img alt="Twitter: pabloskubert" src="https://img.shields.io/twitter/follow/pabloskubert.svg?style=social" />
  </a>
</p>

> Unofficial protectedtext.com API

## Install

```sh
npm install protectedtext-api
```

## Basic usage
```javascript
const ProtectedTextAPI = require('protectedtext-api');

(async function() {
    const site_id = "test";
    const site_password = "123";

    var TabManager = (await new ProtectedTextAPI(site_id, site_password).loadTabs());
    var savedText  = (await TabManager.view());

    // View saved content
    console.log(savedText);

    // Save new content, but keep old text
    await TabManager.save(savedText.concat("IT WORKS!"));
})();
```
## API REFERENCE
<table>
<thead>
  <tr>
    <th>Method</th>
    <th>Params</th>
    <th>Description</th>
    <th>Returns</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>save</td>
    <td>text: string</td>
    <td>Save the given text, rewriting tab content</td>
    <td>boolean</td>
  </tr>
  <tr>
    <td>view</td>
    <td>void</td>
    <td>Get all tab' s content</td>
    <td>string</td>
  </tr>
  <tr>
    <td>deleteSite</td>
    <td>void</td>
    <td>delete site, with all content, dangerous method.</td>
    <td>boolean</td>
  </tr>
</tbody>
</table>

## Future implementations :rocket:	:rocket:
 - Add tab support
 - Add support for browser
 - Auto register site, if not exists

## Author

👤 **Pablo Skubert <pablo1920@protonmail.com>**

* Twitter: [@pabloskubert](https://twitter.com/pabloskubert)
* Github: [@pabloskubert](https://github.com/pabloskubert)
* LinkedIn: [@pablo-henrique-gomes-580458144](https://linkedin.com/in/pablo-henrique-gomes-580458144)

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2021 [Pablo Skubert <pablo1920@protonmail.com>](https://github.com/pabloskubert).<br />
This project is [MIT](https://github.com/pabloskubert/protectedtext-api/blob/master/LICENSE) licensed.
