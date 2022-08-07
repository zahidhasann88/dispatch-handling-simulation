const { Model, DataTypes } = require('sequelize');
const sequelize = require("../../utils/db-connection");

class TransitSlip extends Model { }
TransitSlip.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  transit_slip_no: DataTypes.STRING,
  transit_from: DataTypes.STRING,
  transit_to: DataTypes.STRING,
  transit_method: DataTypes.STRING,
  name_of_courier: DataTypes.STRING,
  created_at: DataTypes.DATE,
  created_by: DataTypes.INTEGER,
  updated_at: DataTypes.DATE,
  updated_by: DataTypes.INTEGER
}, { sequelize, tableName: 'transit_slip', freezeTableName: true });

TransitSlip.sync({
  force: false,
});

module.exports = TransitSlip;