const PersonOrOrganization = require("../db/models/user_model");

//_id, title, timestamp
let userPostsinfo = (by, updateObj, cb) => {
  PersonOrOrganization.update(
    { user_name: by },
    { $push: { summary: { post_id: updateObj._id, title: updateObj.title, timestamp: updateObj.timestamp } } },
    { new: true, upsert: true },
    function(err, managerparent) {
      if (err) {
        return console.log("Error in update.js line: 14");
      }

      console.log(managerparent);
    }
  );
};

module.exports = {
  userPostsinfo
};
