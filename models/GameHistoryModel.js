const { sequelize, DataTypes } = require('../config');

class GameHistoryModel {
  static initialize() {
    this.GameHistory = sequelize.define('game_history', {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
      },
      gamename: {
        type: DataTypes.STRING,
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
      timestamps: false
    });
  }

  static async insertGameHistory(gamename, username, email, round, getScore, totalScore) {
    try {
      await this.GameHistory.create({
        gamename,
        username,
        email,
        round,
        getscore: getScore,
        totalscore: totalScore
      });
    } catch (error) {
      throw new Error('Error inserting game history.');
    }
  }

  static async getUserGameHistory(username, email) {
    try {
      const latestGameHistory = await this.GameHistory.findOne({
        where: {
          username,
          email,
        },
        order: [['round', 'DESC']],
        attributes: ['totalscore', 'gamename', 'username', 'email', 'round', 'getscore'],
        raw: true,
      });
    } catch (error) {
      throw new Error('Error getting user game history.');
    }
  }
  static async updateUserTotalScore(id, newTotalScore) {
    try {
      const gameHistory = await this.GameHistory.findByPk(id);

      if (gameHistory) {
        gameHistory.totalscore = newTotalScore;
        await gameHistory.save();
        return gameHistory;
      } else {
        throw new Error('Game history not found.');
      }
    } catch (error) {
      throw new Error('Error updating game history total score.');
    }
  }
}

module.exports = GameHistoryModel;
