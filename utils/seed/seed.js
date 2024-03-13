const connection = require('../../config/connection');
const { Thought, User } = require('../../model');
const {getRandomUser, getReaction, randomPick, getThought } = require('./data');

async function seed(req, res) {
  // drop all collections in db
  (await connection.db.listCollections().toArray()).map((e) => e.name).forEach((e) => connection.dropCollection(e));

  /**
    @type {Array<import('../typedef').user>}
   */
  const users = new Array(50);

  for (let i = 0; i < users.length; i++) {
    const username = getRandomUser();
    const email = `${username}@email.com`;

    users[i] = { username, email };
  }


  const thoughts = new Array(20);

  for (let i = 0; i < thoughts.length; i++) {
    const thoughtText = getThought();
    const username = /**@type {import('../typedef').user}*/(randomPick(users)).username;
    const reactions = new Array(20);

    for (let i = 0; i < reactions.length; i++) {
      const reactionBody = getReaction();
      const username = /**@type {import('../typedef').user}*/(randomPick(users)).username;

      reactions[i] = { reactionBody, username };
    }

    thoughts[i] = { thoughtText, username, reactions };
  }

  const thoughtData = await Thought.create(thoughts);
  const userData = await User.create(users);

  res.status(201).json({ msg: 'seeded', thoughtData, userData });
}

module.exports = seed;