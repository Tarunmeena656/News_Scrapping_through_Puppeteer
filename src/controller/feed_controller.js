const cheerio = require("cheerio");
const axios = require("axios");
// const parse = require('xml2js')
const puppeteer = require("puppeteer");
const fs = require("fs/promises");
const { parse } = require("rss-to-json");
const channelModel = require("../models/channel");
const FeedModel = require("../models/feed");
const { feedNameObj } = require("../utils/querySelector");
const NewsModel = require("../models/feedNews");

exports.startScrap = async (req, res) => {
  try {
    const channels = await channelModel.find();
    for (const link of channels) {
      const response = await axios.get(link.channel_link);
      const $ = cheerio.load(response.data);
      const feed = $(".links").find($("li")).toArray();

      const feedData = [];
      feed.forEach((e) => {
        let category_link = $(e).find("a").attr("href");
        let category_name = $(e).find("a").text();
        let links = category_link.slice(4);
        category_link = link.channel_link + links;

        feedData.push({ category_name, category_link, channelId: link._id });
      });

      const oldFeedData = await FeedModel.find();
      const oldRssLink = [];
      for (const link of oldFeedData) {
        const { category_link } = link;
        oldRssLink.push(category_link);
      }

      if (oldFeedData.length != 0) {
        for (const data of feedData) {
          const { category_link } = data;
          if (!oldRssLink.includes(category_link)) {
            await FeedModel.create(data);
          }
        }
      } else {
        for (const data of feedData) {
          await FeedModel.create(data);
        }
      }

      // go through every rss category link

      const allCategory = await FeedModel.find().lean();
      const rssData = [];
      for (const feedLink of allCategory) {
        const { category_link } = feedLink;
        let rss = await parse(category_link);
        rss["feedId"] = feedLink._id;
        await rssData.push(rss);
      }
      // console.log(rssData)
      const browser = await puppeteer.launch({
        headless: false,
      });
      const page = await browser.newPage();

      try {
        for (const data of rssData) {
          if (data.items.length != 0) {
            for (const item of data.items) {
              
              let feedTitle = data.title
                .split("|")[1]
                .toLowerCase()
                .replace(/[^a-z]/g, "");
                
                if (feedNameObj.hasOwnProperty(feedTitle)) {
                
                let selector = feedNameObj[feedTitle];
                await page.goto(item.link);
                const text = await page.evaluate(
                  ({ selector }) =>
                    document.querySelector(selector)?.textContent,
                  { selector }
                );
                await NewsModel.create({
                  title : item.title,
                  link : item.link,
                  short_description : `${item.description.replaceAll(/<[^>]*>/ig, "").trim()}`,
                  published_date : item.published,
                  long_description : text,
                  channelId : link._id,
                  feedId : data.feedId
                
                 })
              }
            }
          }
        }
      } 
  
      catch (err) {
       
        console.log(err);
      }

      console.log("start scrapping");
      res.send("Successful");
    }
  } catch (err) {
    console.log(err);
  }
};
