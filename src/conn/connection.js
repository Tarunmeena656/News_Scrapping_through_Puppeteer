const {set,connect,connection} = require('mongoose')



function connectDatabase(){
    set('strictQuery',true);
    return connect("mongodb://localhost:27017/News_Scrapping");
}


connection.on("connected",()=>{
    console.log("connection successfully")
})


module.exports = connectDatabase;