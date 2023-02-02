const Tag = require("../database/models/tag.model");

module.exports = {
    getTagList: () => {
        return Tag.find().exec();
    },
    getTagById: (id) => {
        console.log(id);
        return Tag.findOne({ _id: id }).exec();
    },
    saveTag: (body) => {
        const newTag = new Tag({
            ...body,
        });
        return newTag.save();
    },
    deleteTagById: (id) => {
        return Tag.findByIdAndDelete(id).exec();
    },
    updateOneTag: (id, article) => {
        return Tag.updateOne({ _id: id }, { ...article }).exec();
    },
};
