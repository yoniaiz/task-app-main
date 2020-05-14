const getRequests = require("./get");
const postRequests = require("./post");
const patchRequests = require("./patch");
const deleteRequests = require("./delete");

module.exports = {
  ...getRequests,
  ...postRequests,
  ...patchRequests,
  ...deleteRequests,
};
