const dataSource = require('../models');

class Services {
    constructor(nomedoModel) {
        this.model = nomedoModel;
    }

    async pegaTodosOsRegistros() {
        return dataSource[this.model].findAll();
    }

    // async pegaUmRegistroPorId(id) {
    //   return dataSource[this.model].findByPk(id);
    // }

    // async criaRegistro(dadosDoRegistro) {
    //   return dataSource[this.model].create(dadosDoRegistro);
    // }

    async atualizaRegistro(dadosAtualizados, id) {
        const listadeRegistrosAtualizado = dataSource[this.model].update(
            dadosAtualizados,
            {
                where: { id: id }
            }
        );

        if (listadeRegistrosAtualizado[0] === 0) {
            return false;
        }

        return true;
    }

    // async excluiRegistro(id) {
    //   return dataSource[this.model].destroy({ where: { id: id } });
    // }
}

module.exports = Services;
