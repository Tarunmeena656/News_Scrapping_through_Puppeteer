const { Router } = require('express');
const indexRouter = Router();
const Channel = require('../controller/channel_controller')
const Feed = require('../controller/feed_controller')
const News = require('../controller/news_controller')

indexRouter.post('/insertChannel' ,Channel.insertChannel )

indexRouter.get('/start' , Feed.startScrap)

indexRouter.get('/query' ,News.getNews)


module.exports = indexRouter;