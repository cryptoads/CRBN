module.exports = (sequelize, DataTypes) => {
  var event = sequelize.define('event', {
    eventname: DataTypes.STRING,
    zip: { 
      type: DataTypes.INTEGER(5),
      defaultValue: '30338'
          },
    eventImg: DataTypes.STRING,
    description: DataTypes.STRING,
    offsetscore: DataTypes.FLOAT(2),

  }, {});
  return event;
};