const { sequelize } = require('../config');
const { DataTypes } = require('sequelize');

class GameHistoryModel {
  #model = sequelize.define('game_history', {
    gamename: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    round: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    getscore: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    totalscore: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
      tableName: 'game_history',
      timestamps: false,
      updatedAt: false,
      underscored: true
  });

  async insertGameHistory(newdata) {
    const data = await this.#model.create(newdata);
    return data;
  }

  async getGameHistory(gamename, email) {
    const data = await this.#model.findOne({ 
      where: { 
        gamename, 
        email
      }, 
      order: [['round', 'DESC']],
      attributes: ['gamename', 'id', 'username', 'email', 'round', 'status', 'getscore', 'totalscore'],
      raw: true
    });
    return data;
  }
}

const gameHistoryModel = new GameHistoryModel();
module.exports = { gameHistoryModel };
