const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Comment extends Model {
    static init(sequelize) {
        return super.init(
            {
                content: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },
            },
            {
                modelName: 'Comment',
                tableName: 'comments',
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci',
                sequelize,
            }
        );
    }
    static associate(db) {
        db.Comment.belongsTo(db.User);
        db.Comment.belongsTo(db.Post);
    }
};

// old
// module.exports = (sequelize, DataTypes) => {
//     const Comment = sequelize.define(
//         'Comment',
//         {
//             content: {
//                 type: DataTypes.TEXT,
//                 allowNull: false,
//             },
//         },
//         {
//             charset: 'utf8mb4',
//             collate: 'utf8mb4_general_ci',
//         }
//     );
//     Comment.associate = (db) => {
//         db.Comment.belongsTo(db.User);
//         db.Comment.belongsTo(db.Post);
//     };

//     return Comment;
// };
