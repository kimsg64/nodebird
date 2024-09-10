const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class User extends Model {
    static init(sequelize) {
        return super.init(
            {
                email: {
                    type: DataTypes.STRING(30), // type 및 길이
                    allowNull: false, // 필수
                    unique: true, // 고유
                },
                nickname: {
                    type: DataTypes.STRING(30),
                    allowNull: false,
                },
                password: {
                    type: DataTypes.STRING(100),
                    allowNull: false,
                },
            },
            {
                modelName: 'User',
                tableName: 'users',
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci',
                sequelize,
            }
        );
    }
    static associate(db) {
        db.User.hasMany(db.Post);
        db.User.hasMany(db.Comment);
        db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' }); // 좋아요
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId' }); //
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId' });
    }
};

// module.exports = (sequelize, DataTypes) => {
//     const User = sequelize.define(
//         'User',
//         {
//             email: {
//                 type: DataTypes.STRING(30), // type 및 길이
//                 allowNull: false, // 필수
//                 unique: true, // 고유
//             },
//             nickname: {
//                 type: DataTypes.STRING(30),
//                 allowNull: false,
//             },
//             password: {
//                 type: DataTypes.STRING(100),
//                 allowNull: false,
//             },
//         },
//         {
//             charset: 'utf8',
//             collate: 'utf8_general_ci',
//         }
//     );
//     User.associate = (db) => {
//         db.User.hasMany(db.Post);
//         db.User.hasMany(db.Comment);
//         db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' }); // 좋아요
//         db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId' }); //
//         db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId' });
//     };

//     return User;
// };
