const axios = require("axios");
const jsdom = require("jsdom");
module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const _res = await axios.get(
    "https://movie285.com/?s=" + encodeURI(req.body.search)
  );
  const dom = new jsdom.JSDOM(_res.data);
  let out = [];
  dom.window.document.querySelectorAll(".col-3.list-box-item").forEach((a) => {
    out.push({
      title: a
        .getElementsByClassName("list-link")[0]
        .getElementsByClassName("list-box")[0]
        .getElementsByClassName("list-title")[0].innerHTML,
      href: a
        .getElementsByClassName("list-link")[0]
        .href.replace("https://movie285.com/", ""),
      pic: a
        .getElementsByClassName("list-link")[0]
        .getElementsByClassName("list-box")[0]
        .getElementsByClassName("list-thumbnail")[0]
        .getElementsByClassName("attachment-full")[0].src,
    });
  });
  res.send(out);
};
