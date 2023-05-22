const express = require('express');
const connection = require('./conn/connection')
const channelScrap = require('./controller/feed_controller')
const indexRouter = require('./route/index')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(indexRouter)

//connection
connection()
.then(() => {  
    app.listen(8000 , () => {
        console.log("Server running at 8000")
    })
})
.catch(err => console.log(err))

// channelScrap()