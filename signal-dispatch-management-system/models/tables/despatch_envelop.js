const { Model, DataTypes } = require('sequelize');
const sequelize = require("../../utils/db-connection");

class DespatchEnvelop extends Model { }
DespatchEnvelop.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  letter_no: DataTypes.STRING,
  date_time_group: DataTypes.STRING,
  originator_no: DataTypes.STRING,
  from_address: DataTypes.STRING,
  to_address: DataTypes.STRING,
  precedance: DataTypes.STRING,
  security_classification: DataTypes.STRING,
  created_at: DataTypes.DATE,
  created_by: DataTypes.INTEGER,
  updated_at: DataTypes.DATE,
  updated_by: DataTypes.INTEGER
}, { sequelize, tableName: 'despatch_envelop', freezeTableName: true });

DespatchEnvelop.sync({
  force: false,
});

module.exports = DespatchEnvelop;
