const { Role, User } = require('../models/models')

// Find all documents in a collection
async function getAllRoles(){
    return await Role.find({})
}

// Find users that have specifiec role
async function getUsersWithRole(roleName) {
    // Get the role ID
    let roleID = await Role.findOne({name: roleName}).exec();

    // Filter the users to find only those with matching roleID
    let usersFound = await User.find({role: roleID}).exec();

    return usersFound;
}

module.exports = {
    getAllRoles,
    getUsersWithRole
}