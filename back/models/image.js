const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Image extends Model {
    static init(sequelize) {
        return super.init(
            {
                src: {
                    type: DataTypes.STRING(200),
                    allowNull: false,
                },
            },
            {
                modelName: 'Image',
                tableName: 'images',
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci',
                sequelize,
            }
        );
    }
    static associate(db) {
        db.Image.belongsTo(db.Post);
    }
};

// module.exports = (sequelize, DataTypes) => {
//     const Image = sequelize.define(
//         'Image',
//         {
//             src: {
//                 type: DataTypes.STRING(200),
//                 allowNull: false,
//             },
//         },
//         {
//             charset: 'utf8',
//             collate: 'utf8_general_ci',
//         }
//     );
//     Image.associate = (db) => {
//         db.Image.belongsTo(db.Post);
//     };

//     return Image;
// };
