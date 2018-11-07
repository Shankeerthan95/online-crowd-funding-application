const express = require("express");
const _ = require('lodash');
const router = express();
const createPost = require("../services/createPost");
const { findPosts, findById, findNew } = require("../services/find");
const { onPostCreated } = require('../amqp/publish');


router.post("/new", (req, res) => {
  if (!req.body.post) {
    return res.status(400).end("post obj not exist");
  }

  createPost(req.body.post, function(err, post) {
    if (err) {
      return res.json(err.message);
    }

    //On successfull creation of post , it publish message to user service
    // Message should contains user_name(by in post_schema) and post _id
    //Todo
    let msg = _.pick(post, ['_id', 'by', 'title', 'timestamp' ])
    onPostCreated(msg, (err) => {
        console.log("Error at index.js line: 22");
    });


    return res.json(post);
  });
});

/*
*   1 post - random for every request 
*   newers posts 10
*   gaining momentum 10
*   successfull 5
*/
router.get("/posts/home", (req, res) => {});

//Todo : for simplicity now i skip req params
router.get("/posts", (req, res) => {
  let sortBy;
  let order;

  if (req.query.order) {
    if (req.query.sortby) {
      sortBy = req.query.sortby;

      switch (req.query.sortby) {
        case "new": {
          order = "dsc";

          break;
        }
        case "successful": {
          order = "asc";
          break;
        }
        case "gaining": {
          order = "asc";
          break;
        }
        default: {
          order = "dsc";
          sortBy = "new";
        }
      }
    } else {
      //Default
      sortBy = "new";
    }

    order = req.query.order;
  } else {
    //default
    if (req.query.sortby) {
      sortBy = req.query.sortby;
      switch (req.query.sortby) {
        case "new": {
          order = "dsc";

          break;
        }
        case "successful": {
          order = "asc";
          break;
        }
        case "gaining": {
          order = "asc";
          break;
        }
        default: {
          order = "dsc";
          sortBy = "new";
        }
      }
    } else {
      //default
      sortBy = "new";
      order = "dsc";
    }
  }

  if (req.query.page && req.query.limit) {
    currentPage = Number.parseInt(req.query.page);
    limit = Number.parseInt(req.query.limit);
  } else {
    //Default if query params page and limit not exist
    let currentPage = 0;
    let limit = 10;
  }

//   return res.send(
//     "currentpage: " +
//       currentPage +
//       "\nlimit: " +
//       limit +
//       "\nsortby: " +
//       sortBy +
//       "\norder : " +
//       order
//   );

  switch (sortBy) {
    case "new": {
      return findNew({ currentPage, limit, order }, (err, posts) => {
        if (err) {
            return res.status(400).end("Error in index.js line 116");
        } 

        return res.json(posts);
      });

      break;
    }
    case "success": {
      //TODO IMPLEMENT IT AFTER GET WORKING FULL SYSTEMS

      break;
    }
    case "gaining": {
      //TODO IMPLEMENT IT AFTER GET WORKING FULL SYSTEMS

      break;
    }
  }

  if (req.query.page && req.query.limit) {
    findPosts(
      {
        perPage: Number.parseInt(req.query.limit),
        currentPage: Number.parseInt(req.query.page)
      },
      (err, posts) => {
        if (err) {
          //todo:
          return res.status(400).end("Error");
        }

        return res.status(200).json(posts);
      }
    );
  } else {
    return res.status(400).send("Empty query parameters");
  }
});

//Todo: for simplicity i skip raised amout by collecting message from payment service
router.get("/posts/:id", (req, res) => {
  findById(req.params.id, (err, post) => {
    if (err) {
      //Todo: change status codes and meaningful error messages
      return res.status(400).end("Error");
    }

    return res.status(200).json(post);
  });
});

module.exports = router;
