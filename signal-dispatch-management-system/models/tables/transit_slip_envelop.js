const { Model, DataTypes } = require('sequelize');
const sequelize = require("../../utils/db-connection");

class TransitSlipEnvelop extends Model { }
TransitSlipEnvelop.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  transit_slip_id: DataTypes.INTEGER,
  sl_no: DataTypes.STRING,
  originator_no: DataTypes.STRING,
  precedence: DataTypes.STRING,
  transit_from: DataTypes.STRING,
  transit_to: DataTypes.STRING,
  local_despatch_time: DataTypes.STRING,
  local_despatch_signature: DataTypes.STRING,
  created_at: DataTypes.DATE,
  created_by: DataTypes.INTEGER,
  updated_at: DataTypes.DATE,
  updated_by: DataTypes.INTEGER
}, { sequelize, tableName: 'transit_slip_envelop', freezeTableName: true });

TransitSlipEnvelop.sync({
  force: false,
});

module.exports = TransitSlipEnvelop;