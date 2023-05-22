const ChannelModel = require('../models/channel')
exports.insertChannel = async(req,res) => {
    try{
        const { channel_name , channel_link } = req.body;
        const channelExist = await ChannelModel.find({channel_link});
        if(channelExist == 0){
             await ChannelModel.create({ channel_name , channel_link})
             res.json({ message : "Successfully" })
        }

    }
    catch(err){
        console.log(err)
    }
}