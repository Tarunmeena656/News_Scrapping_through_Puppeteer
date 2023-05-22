const { Schema, model } = require("mongoose");

const newsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    short_description: {
      type: String,
    
    },
    published_date: {
      type: Date,

    },
    long_description: {
      type: String,

    },
    channelId: {
      type: Schema.Types.ObjectId,
      ref: "channelModel",
    },
    feedId: {
      type: Schema.Types.ObjectId,
      ref: "feedModel",
    },
  },
  { timestamps: false, versionKey: false }
);

module.exports = newsModel = model("newsData", newsSchema);
