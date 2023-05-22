const { Schema, model } = require("mongoose");

const channelSchema = new Schema(
  {
    channel_name: {
      type: String,
      required: true,
    },
    channel_link: {
      type: String,
      required: true,
    },
  },
  { timestamps: false, versionKey: false }
);

module.exports = channelModel = model("channelData", channelSchema);
