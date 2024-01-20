const dataSource = require('../models');

class Services {
    constructor(nomedoModel) {
        this.model = nomedoModel;
    }

    async pegaTodosOsRegistros() {
        return dataSource[this.model].findAll();
    }
}

module.exports = Services;
