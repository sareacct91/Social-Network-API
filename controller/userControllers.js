const { User, Thought } = require('../model');
const { ObjectId } = require('mongoose').Types;
const { BadRequestError } = require('../utils/errors');
const NotFoundError = require('../utils/errors/NotFoundError');

module.exports = {
  async findUsers(req, res) {
    const users = await User.find();
    res.status(200).json({ msg: 'success', users });
  },

  async findOneUser(req, res) {
    /**@type {string} */
    const id = req.params.id;

    const user = await User.findById(new ObjectId(id), {},  {populate: ['thoughts', 'friends']})
    res.status(200).json({ msg: 'sucess', user });
  },

  async createUser(req, res) {
    const { username, email } = req.body;

    if (!(username && email)) {
      throw new BadRequestError('Missing username or email. Please try again');
    }

    const user = await User.create({ username, email });
    res.status(201).json({ msg: 'created', user });
  },

  async updateUser(req, res) {
    const { username, email } = req.body;
    /**@type {string} */
    const id = req.params.id;

    if (!(username || email)) {
      throw new BadRequestError('No data to update');
    }

    const user = await User.findByIdAndUpdate(new ObjectId(id), { username, email }, { new: true });

    res.status(201).json({ msg: 'updated', user });
  },

  async deleteUser(req, res) {
    /**@type {string} */
    const id = req.params.id;

    const userResult = await User.findByIdAndDelete(new ObjectId(id))

    if (!userResult) {
      throw new NotFoundError(`no user found with id ${id}`);
    }

    if (userResult.thoughts.length > 0) {
      const username = userResult.username;
      await Thought.deleteMany({ username });
    }

    res.status(200).json({ msg: 'deleted'});
  }
};