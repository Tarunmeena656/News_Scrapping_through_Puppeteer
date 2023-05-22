const { Schema, model } = require("mongoose");

const feedSchema = new Schema(
  {
    category_name: {
      type: String,
      required: true,
    },
    category_link: {
      type: String,
      required: true,
    },
    channelId: {
      type: Schema.Types.ObjectId,
      ref: "channelModel",
    },
  },
  { timestamps: false, versionKey: false }
);

module.exports = feedModel = model("feedData", feedSchema);
