const { Model, DataTypes } = require('sequelize');
const sequelize = require("../../utils/db-connection");

class DespatchEnvelopDistribution extends Model { }
DespatchEnvelopDistribution.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  sent_from: DataTypes.INTEGER,
  sent_to: DataTypes.INTEGER,
  despatch_envelop_id: DataTypes.INTEGER,
  created_at: DataTypes.DATE
}, { sequelize, tableName: 'despatch_envelop_distribution', freezeTableName: true });

DespatchEnvelopDistribution.sync({
  force: false,
});

module.exports = DespatchEnvelopDistribution;
