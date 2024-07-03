// routes/user.js

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');

// GET all users
router.get('/', UserController.getAllUsers);

// POST create a new user
router.post('/', UserController.createUser);

// PUT update user details
router.put('/:id', UserController.updateUser);

// DELETE delete a user
router.delete('/:id', UserController.deleteUser);

module.exports = router;
