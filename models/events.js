module.exports = (sequelize, DataTypes) => {
  var event = sequelize.define('event', {
    eventname: DataTypes.STRING,
    zip: { 
      type: DataTypes.INTEGER(5),
      defaultValue: '30338'
          },
    eventImg: DataTypes.STRING,
    description: DataTypes.STRING,
    badgeimg: DataTypes.STRING,
    offsetscore: DataTypes.FLOAT(2),

  }, {});
  event.associate = function(models) {
      event.belongsToMany(models.user, 
                {
                    through: 'userevents'
                }, {hooks: false})
  };
  return event;
};