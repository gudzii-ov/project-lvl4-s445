export default (sequelize, DataTypes) => {
  const TaskStatus = sequelize.define('TaskStatus', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
  });

  return TaskStatus;
};
