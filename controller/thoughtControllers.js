const { Thought } = require("../model");
const { BadRequestError, NotFoundError } = require("../utils/errors");

module.exports = {
  /**
   * @param {import('express').Request} req express request object
   * @param {import('express').Response} res express response object
   */
  async findThoughts(req, res) {
    const thoughts = await Thought.find();

    if (!thoughts) {
      throw new NotFoundError(`no thoughts found`);
    }

    res.status(200).json({msg: 'success', thoughts});
  },


  /**
   * @param {import('express').Request} req express request object
   * @param {import('express').Response} res express response object
   */
  async findOneThought(req, res) {
    const id = req.params.thoughtId;

    const thought = await Thought.findById(id);

    if (!thought) {
      throw new NotFoundError(`no thought found with id ${id}`);
    }

    res.status(200).json({msg: 'success', thought});
  },


  /**
   * @param {import('express').Request} req express request object
   * @param {import('express').Response} res express response object
   */
  async createThought(req, res) {
    /**@type {{thoughtText: string, username: string, userId: string}} */
    const {thoughtText, username, userId} = req.body;

    if(!(thoughtText && username && userId)) {
      throw new BadRequestError(`Missing data. Try again`);
    }

    const thought = await Thought.create({ thoughtText, username });

    res.status(200).json({ msg: 'success', thought });
  },


  /**
   * @param {import('express').Request} req express request object
   * @param {import('express').Response} res express response object
   */
  async updateThought(req, res) {
    const id = req.params.thoughtId;
    /**@type {{thoughtText: string}} */
    const { thoughtText } = req.body;

    if (!thoughtText) {
      throw new BadRequestError('No data provided to update')
    }

    const thought = await Thought.findByIdAndUpdate(
      id,
      { thoughtText },
      { new: true }
    );

    if (!thought) {
      throw new NotFoundError(`No thought found with id ${id}`);
    }

    res.status(200).json({ msg: 'success', thought });
  },


  /**
   * @param {import('express').Request} req express request object
   * @param {import('express').Response} res express response object
   */
  async deleteThought(req, res) {
    const id = req.params.thoughtId;

    const result = await Thought.findByIdAndDelete(id);

    if (!result) {
      throw new NotFoundError(`No thought found with id ${id}`);
    }

    res.status(200).json({ msg: 'success' });
  },


  /**
   * @param {import('express').Request} req express request object
   * @param {import('express').Response} res express response object
   */
  async addReaction(req, res) {
    const id = req.params.thoughtId;
    /**@type {{reactionBody: string, username: string}} */
    const { reactionBody, username } = req.body;

    if (!(reactionBody && username)) {
      throw new BadRequestError('Missing reactionBody or username. Please try again');
    }

    const thought = await Thought.findByIdAndUpdate(
      id,
      { $push: { reactions: { reactionBody, username } } },
      { new: true }
    );

    if (!thought) {
      throw new BadRequestError(`No Thought found with id ${id}`);
    }

    res.status(200).json({msg: 'success', thought})
  },


  /**
   * @param {import('express').Request} req express request object
   * @param {import('express').Response} res express response object
   */
  async deleteReaction(req, res) {
    /**@type {{reactionId: string}} */
    const { reactionId } = req.body;
    const { thoughtId } = req.params;

    if (!reactionId) {
      throw new BadRequestError('Missing reactionId');
    }

    // const thought = await Thought.findByIdAndUpdate(
    //   thoughtId,
    //   { $pull: { 'reactions.$[element]': reactionId } },
    //   { arrayFilters: [{ 'element.reactionId': reactionId }] }
    // );

    const thought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: {reactionId} } },
    );

    if (!thought) {
      throw new BadRequestError(`No thought found with id ${thoughtId}`);
    }

    res.status(200).json({ msg: 'success' });
  },
};
