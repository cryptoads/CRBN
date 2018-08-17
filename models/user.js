module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
     username: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          is: /^[a-z0-9\_\-]+$/i,
          }
     },
    email: {
        type: DataTypes.STRING,
         validate: {
         isEmail: true
        }
     },
    fbid: DataTypes.STRING,
    githubid: DataTypes.STRING,
    password:DataTypes.STRING,
    miles_driven: DataTypes.FLOAT(1),
    mpg: DataTypes.INTEGER,
    maintenance: DataTypes.BOOLEAN,
    zip: { 
      type: DataTypes.INTEGER(5),
      defaultValue: '30338'
          },
    electric_bill: DataTypes.FLOAT(2),
    natgas_bill: DataTypes.FLOAT(2),
    household_members: DataTypes.INTEGER,
    aluminum: DataTypes.BOOLEAN,
    plastic: DataTypes.BOOLEAN,
    glass: DataTypes.BOOLEAN,
    paper: DataTypes.BOOLEAN,
    intro: DataTypes.TEXT(250),
    score: DataTypes.DECIMAL(10,2),
    imgUrl: {
      type: DataTypes.STRING,
      defaultValue: "https://qph.fs.quoracdn.net/main-qimg-80b031daebee6d6cdbafec6daf5a47b9-c"
            },

  }, {});
  user.associate = function(models) {
   user.belongsToMany(models.event, {
    through: 'userevents'
   })
  };
  return user;
};