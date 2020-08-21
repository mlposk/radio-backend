const helper = {};
helper.model = {};
helper.file = {};

helper.model.findAll = async (model) => {
    return model.find();
}

helper.file.makeArray = (files) => {
    if (files) {
        let document = [];
        for (let index in files) {
            if (files.hasOwnProperty(index)) {
                let file = files[index];
                document.push({
                    originalName: file.originalname,
                    mimeType: file.mimetype,
                    path: file.path,
                    size: file.size
                })
            }
        }
        return document;
    }
}

module.exports = helper;