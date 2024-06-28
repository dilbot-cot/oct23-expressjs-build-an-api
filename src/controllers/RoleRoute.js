// Import express
const express = require('express');
const { getAllRoles, getUsersWithRole } = require('./RoleFunctions');
const router = express.Router();

//Show all roles
router.get('/', async (request, response) => {
    let responseData = {};

    responseData = await getAllRoles();

    response.json({
        data: responseData
    })
})

//Show all users with matching role
router.get('/:roleName', async (request, response) => {
    let responseData = {}

    responseData = await getUsersWithRole(request.params.roleName)

    response.json({
        data: responseData
    })
})

module.exports = router;