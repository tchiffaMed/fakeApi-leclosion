const Queries = require("../queries/tag.queries");

module.exports = {
    list: async (req, res, next) => {
        try {
            const tagList = await Queries.getTagList();
            res.status(200).json({
                status: 200,
                result: tagList,
            });
        } catch (e) {
            res.status(500).json({
                status: 500,
                message: "Erreur de get tag",
            });
        }
    },
    show: async (req, res) => {
        try {
            const id = req.params.id;
            const tag = await Queries.getTagById(id);
            if (!tag) {
                res.status(404).json({
                    status: 404,
                    message: "not-found",
                });
            } else {
                res.status(200).json({
                    status: 200,
                    result: tag,
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
            const body = {
                name: req.body.name,
            };

            const savedTag = await Queries.saveTag(body);
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
        const tag = JSON.parse(req.body.tag);
        try {
            const updatedArticle = await Queries.updateOneArticle(id, article);
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
