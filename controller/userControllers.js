const { User, Thought } = require('../model');
const { BadRequestError, NotFoundError } = require('../utils/errors');

module.exports = {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async findUsers(req, res) {
    const users = await User.find();
    res.status(200).json({ msg: 'success', users });
  },


  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async findOneUser(req, res) {
    const id = req.params.userId;

    const user = await User.findById(
      id,
      null,
      { populate: ['thoughts', 'friends'] }
    );

    if (!user) {
      throw new NotFoundError(`no user found with id ${id}`);
    }

    res.status(200).json({ msg: 'sucess', user });
  },


  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async createUser(req, res) {
    /**@type {{username: string, email: string}} */
    const { username, email } = req.body;

    if (!(username && email)) {
      throw new BadRequestError('Missing username or email. Please try again');
    }

    const user = await User.create({ username, email });

    res.status(201).json({ msg: 'created', user });
  },


  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async updateUser(req, res) {
    /**@type {{username: string, email: string}} */
    const { username, email } = req.body;

    const id = req.params.userId;

    if (!(username || email)) {
      throw new BadRequestError('No data to update');
    }

    const user = await User.findByIdAndUpdate(
      id,
      { username, email },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new NotFoundError(`no user found with id ${id}`);
    }

    res.status(201).json({ msg: 'updated', user });
  },


  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async deleteUser(req, res) {
    const id = req.params.userId;

    const userResult = await User.findByIdAndDelete(id)

    if (!userResult) {
      throw new NotFoundError(`no user found with id ${id}`);
    }

    res.status(200).json({ msg: 'deleted'});
  },


  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async addFriend(req, res) {
    const { userId, friendId } = req.params;

    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { friends: friendId } },
      { new: true, populate: ['thoughts', 'friends'] }
    );

    if (!user) {
      throw new NotFoundError(`No user found with id ${userId}`);
    }

    res.status(200).json({ msg: 'success', user });
  },


  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async deleteFriend(req, res) {
    const { userId, friendId } = req.params;

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } },
      { new: true, populate: ['thoughts', 'friends'] }
    );

    if (!user) {
      throw new NotFoundError(`No user found with id ${userId}`);
    }

    res.status(200).json({ msg: 'success', user });
  },
};