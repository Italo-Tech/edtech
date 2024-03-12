const { DataTypes, Model} = require('sequelize')

class Students extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            ra: DataTypes.INTEGER,
            cpf: DataTypes.STRING,
        }, {
            sequelize,
            paranoid: true, // Habilitando soft deletes
            /*tableName: 'students',
            modelName: 'Students',
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
            deletedAt: 'deletedAt'*/
        })
    }
}

module.exports = Students;
