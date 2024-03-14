const { User } = require('../model');
const { ObjectId } = require('mongoose').Types;

module.exports = {
  async findUsers(req, res) {
    const users = await User.find();
    res.status(200).json({ msg: 'success', users });
  },

  async findOneUser(req, res) {
    /**@type {string} */
    const id = req.params;

    const user = await User.findById(new ObjectId(id), {},  {populate: ['thoughts', 'friends']})
    res.status(200).json({ msg: 'sucess', user });
  },

  async createUser(req, res) {

  },

  async updateUser(req, res) {

  },

  async deleteUser(req, res) {

  }
};