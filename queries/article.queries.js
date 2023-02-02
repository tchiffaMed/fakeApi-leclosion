const Article = require("../database/models/article.model");

module.exports = {
  getArticleList: async (page) => {
    const articles = await Article.find().sort({ createdAt: -1 }).limit(30).skip(page * 30).populate("tags").exec();
    const counts = await Article.find().count().exec();
    return {
      articles,
      counts
    }
  },
  getArticleById: (id) => {
    return Article.findOne({ _id: id }).populate("tags").exec();
  },
  searchArticles: async (title) => {

    const articles = await Article.find({ title: { $regex: title } })?.limit(100)?.populate("tags")?.exec();

    const counts = await Article.find({ title: { $regex: title } })?.count()?.exec();
    return {
      articles,
      counts
    }
  },
  saveArticle: (body) => {
    const newArticle = new Article({
      ...body,
    });
    return newArticle.save();
  },
  deleteArticleById: (id) => {
    return Article.findByIdAndDelete(id).exec();
  },
  getImageArticle: (id) => {
    return Article.findOne({ _id: id }, { image: true }).exec();
  },
  updateOneArticle: (id, article) => {
    return Article.updateOne({ _id: id }, { ...article }).exec();
  },
};
