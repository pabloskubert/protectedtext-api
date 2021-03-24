const { default: axios } = require("axios");
const CryptoJS = require('crypto-js');

module.exports = class ProtectedTextApi {

    constructor(site_id, passwd) {
        this.siteHash = CryptoJS.SHA512("/" + site_id).toString();
        this.pass = passwd;
        this.passHash = CryptoJS.SHA512(passwd).toString();
        this.endpoint = "https://www.protectedtext.com".concat("/", site_id);

        this.siteObj = {};
        this.dbversion = 0;
    }

    async loadTabs() {
        this.siteObj = (await axios.get(this.endpoint.concat('?action=getJSON'))).data;
        this.dbversion = this.siteObj['currentDBVersion'];
        this.rawtext = CryptoJS.AES.decrypt(this.siteObj['eContent'], this.pass).toString(CryptoJS.enc.Utf8);

        // Remove SHA2-512 HASH added after user's content
        this.rawtext = this.rawtext.substring(0, (this.rawtext.length - 128));
        return this;
    }

    async save(textToSave) {
        const encript = String(textToSave + this.siteHash);
        var textEncrypted = await CryptoJS.AES.encrypt(encript, this.pass).toString();

        const postdata = new URLSearchParams();
        postdata.append("initHashContent", this.getWritePermissionProof(this.rawtext));
        postdata.append("currentHashContent", this.getWritePermissionProof(textToSave));
        postdata.append("encryptedContent", textEncrypted);
        postdata.append("action", "save");

        var ret = undefined;
        try {
            ret = (await axios.post(this.endpoint, postdata, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36`
                }
            })).data;
        } catch (err) {
            throw Error(err.message);
        }

        this.rawtext = textToSave;
        return (ret['status'] == 'success');
    }

    async deleteSite() {
        var inithashcontent = this.getWritePermissionProof(this.rawtext);
        const deleteAction = new URLSearchParams();
        deleteAction.append("initHashContent", inithashcontent);
        deleteAction.append("action", "delete");

        return (await axios.post(this.endpoint, deleteAction))
            .data['status'] == 'success';
    }

    async view() {
        try {
            return this.rawtext;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    getWritePermissionProof(content) {
        return (this.dbversion == 1)
            ? CryptoJS.SHA512(content).toString()
            : CryptoJS.SHA512(content + this.passHash).toString() + this.dbversion
    }
}