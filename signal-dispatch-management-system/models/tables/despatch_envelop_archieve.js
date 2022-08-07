const { Model, DataTypes } = require('sequelize');
const sequelize = require("../../utils/db-connection");

class DespatchEnvelopArchieve extends Model { }
DespatchEnvelopArchieve.init({
  id: {
    type: DataTypes.INTEGER
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
}, { sequelize, tableName: 'despatch_envelop_archieve', freezeTableName: true });

DespatchEnvelopArchieve.sync({
  force: false,
});

module.exports = DespatchEnvelopArchieve;