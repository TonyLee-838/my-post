const getDefaultPostDescription = (html) => html.replace(/<[^>]+>/g, "");
module.exports = getDefaultPostDescription;
