const ProtectedTextAPI = require('./index');

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