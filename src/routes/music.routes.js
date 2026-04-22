const express = require("express");
const multer = require("multer");
const upload = multer({
    storage:multer.memoryStorage()
})
const router = express.Router();
const musicController = require("../controllers/music.controllers")
const authMiddleware = require("../middlewares/auth.middleware")


router.post("/upload",authMiddleware.authArtist,upload.single("music"),musicController.createMusic);
router.post("/album", musicController.createAlbum);

router.get("/musics",musicController.getAllMusics);
router.get("/albums",authMiddleware.authUser,musicController.getAllAlbums)
router.get("/albums/:albumId",authMiddleware.authUser,musicController.getAlbumById)
module.exports = router;
