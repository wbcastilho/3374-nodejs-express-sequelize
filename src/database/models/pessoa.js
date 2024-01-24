'use strict';

const isCpfValido = require('../../utils/validaCpfHelper.js');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoa extends Model {    
    static associate(models) {
      Pessoa.hasMany(models.Curso, {
        foreignKey: 'docente_id'
      });
      Pessoa.hasMany(models.Matricula, {
        foreignKey: 'estudante_id',
        // Escopo de associação 
        scope: { status: 'matriculado' },
        as: 'aulasMatriculadas'
      });
      Pessoa.hasMany(models.Matricula, {
        foreignKey: 'estudante_id',        
        as: 'todasAsMatriculas'
      });
    }
  }
  Pessoa.init({
    nome: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [3, 30],
          msg: 'O campo deve ter no mínimo 3 caracteres'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Formato do email inválido'
        }
      }
    },
    cpf: {
      type: DataTypes.STRING,
      validate: {
        cpfEhValido: (cpf) => {
          if (!isCpfValido(cpf)) throw new Error('Número de CPF inválido');
        }
      }
    },
    ativo: DataTypes.BOOLEAN,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoa',
    tableName: 'pessoas',
    paranoid: true,
    defaultScope: {
      // Escopo global que irá exibir apenas as pessoas onde ativo==true nas consultas por padrão
      where: {
        ativo: true
      }
    },
    scopes: {
      // Escopo criado para exibir todas as pessoas independnete se ativo==true ou ativo==false
      todosOsRegistros: {
        where: {}
      }
    }
  });
  return Pessoa;
};