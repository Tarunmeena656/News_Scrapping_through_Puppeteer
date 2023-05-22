const Channel = require('../models/channel');
const Feed = require('../models/feed');
const News = require('../models/feedNews')
const createError = require('http-errors')
exports.getNews = async(req,res) => {
    try {
        const channel = req.query.channel;
        const clink = req.query.link;
        console.log( channel  , clink)
        const Channel_name = await Channel.findOne({channel});
        if(!Channel_name) throw createError.NotFound("Channel Not found")
        const category = await Feed.findOne({clink})
        if(!category) throw createError.NotFound("link Not found");
        const newsData = await News.find({feedId : category._id})
        console.log(newsData)
        res.send("done");
    } catch (error) {
        console.log(error)
    }
}
