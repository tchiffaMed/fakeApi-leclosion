const Queries = require("../queries/article.queries");

module.exports = {
  list: async (req, res, next) => {
    const { page } = req.query;

    try {
      const articleList = await Queries.getArticleList(parseInt(page ?? '0'));
      res.status(200).json({
        status: 200,
        result: articleList,
      });
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: "Erreur de get article",
      });
    }
  },
  show: async (req, res) => {
    try {
      const id = req.params.id;
      const article = await Queries.getArticleById(id);
      if (!article) {
        res.status(404).json({
          status: 404,
          message: "not-found",
        });
      } else {
        res.status(200).json({
          status: 200,
          result: article,
        });
      }
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: "Erreur lors de la recupération par id",
        error: e,
      });
    }
  },
  getArticle: async (req, res, next) => {
    try {
      const title = req.query?.title;
      const results = await Queries.searchArticles(title);
      if (!results) {
        res.status(404).json({
          status: 404,
          message: "not-found",
        });
      } else {
        res.status(200).json({
          status: 200,
          result: results,
        });
      }
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: "Erreur lors de la recupération par id",
        error: e,
      });
    }
  },
  create: async (req, res, next) => {
    try {

      const savedArticle = await Queries.saveArticle(req.body);
      res.status(200).json({
        status: 200,
        message: "produit Sauvegarder avec succes",
      });
    } catch (e) {
      res.status(500).json({
        message: "Echec de la sauvegade des données",
        error: e,
      });
    }
  },
  update: async (req, res, next) => {
    const id = req.params.id;
    try {
      const updatedArticle = await Queries.updateOneArticle(id, req.body);
      res.status(200).json({
        status: 200,
        message: "article updated",
      });
    } catch {
      res.status(500).json({
        status: 500,
        message: "erreur d'update",
      });
    }
  },
  delete: async (req, res, next) => {
    try {
      const id = req.params.id;
      const deletedArticle = await Queries.deleteArticleById(id);
      res.status(200).json({
        status: 200,
        message: "produit supprimé",
      });
    } catch (e) {
      res.status(404).json({
        status: 404,
        message: "not-found",
        error: e,
      });
    }
  },
};
