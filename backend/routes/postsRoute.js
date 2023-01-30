const express = require("express");
const router = express.Router();

const multer = require("multer");

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg"
}

const storage = multer.diskStorage({
    destination: function(req, file, cb){

        let error;

        let isValid = MIME_TYPE_MAP[file.mimetype];

        if(isValid){
            error = null;
        }else {
            error = new Error("Invalid Mime Type");
        }

        cb(error, "uploads/");
    },
    filename: function(req, file, cb){
        const name = Math.random() + "-" + file.originalname.toLowerCase().split(" ").join("-");
        cb(null, name);
    },
})

const upload = multer({ storage });

const { getPosts, getPost, createPost, deletePost, updatePost } = require("../controllers/postsController");

router
    .route("/")
    .get(getPosts)
    .post(upload.single("image"), createPost)

router
    .route("/:id")
    .delete(deletePost)
    .patch(updatePost)
    .get(getPost)

module.exports = router;