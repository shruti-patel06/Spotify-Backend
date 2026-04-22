const musicModel = require("../models/music.model");
const albumModel = require("../models/albums.model")
const userModel = require("../models/user.model.js")
const { uploadFile }  = require('../services/storage.services')
const jwt = require("jsonwebtoken");
async function createMusic(req,res){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(decoded.role !== "artist"){
            return res.status(403).json({message : "Forbidden:you don't have access to create music"})
        }
        const { title }=req.body;
        const file = req.file;
        const result = await uploadFile(file.buffer.toString('base64'))
        const music = await musicModel.create({
            uri:result.url,
            title,
            artist:req.user.id,
        })
        
        res.status(201).json({
            message:"music created successfully",
            music:{
                id : music._id,
                uri:music.uri,
                title:music.title,
                artist:music.artist
            }
        })
     }
    catch(err){
        console.log(err)
        return res.status(401).json({ message : "Unauthorized" })
    }
}
async function createAlbum(req,res){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }
    try{
        console.log("Token received:", token);
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        console.log("Decoded:", decoded);
        if(!decoded){
            return res.status(403).json({message:"Forbidden:You don't have access"})
        }
        
        const { title,musics }= req.body;
        console.log("Creating album with:", {title, musics, artist: decoded.id});
        const album = await albumModel.create({
            title,
            artist:decoded.id,
            musics:musics
        })
        res.status(201).json({
            message:"Album created successfully",
            album:{
                id: album._id,
                title: album.title,
                artist:album.artist,
                musics:album.musics,
            }
        })
    }catch(err){
        console.log("Error in createAlbum:", err.message);
        return res.status(401).json({
            success:false,
            message:"Unauthorized"
        })
    }
}
async function getAllMusics(req,res){
    const music = await musicModel.find().populate("artist");
    const musics = await musicModel
    .find()
    .limit(5)
    .populate("artist","username email")
    res.status(200).json({
        message:"Music fetched successfully",
        musics:musics
    })
}
async function getAllAlbums(req,res){
    const albums = await albumModel.find().select("title artist").populate("artist","username email").populate("musics");
    res.status(200).json({
        message:"Albums fetched successfully",
        albums:albums,
    })
}
async function getAlbumById(req,res){
    const albumId = req.params.albumId;
    const album = await albumModel.findById(albumId).populate("artist","username email").populate("musics");
    return res.status(200).json({
        message:"Album fetched successfully",
        album:album,
    })
}
module.exports = { createMusic,createAlbum,getAllMusics,getAllAlbums,getAlbumById};