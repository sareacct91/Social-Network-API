const connection = require('../../config/connection');
const { Thought, User } = require('../../model');
const { getRandomUser, getReaction, randomPick, getThought } = require('./data');
const {ObjectId} = require('mongoose').Types

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


  const thoughts = new Array(100);

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

  const thoughtsData = await Thought.create(thoughts);
  const usersData = await User.create(users);


  thoughtsData.forEach(async (t) => {
    const i = usersData.findIndex((u) => u.username === t.username);
    await usersData[i].updateOne({ $push: { thoughts: new ObjectId(t._id) } });
  })

  usersData.forEach(async (u, i) => {
    i = i === usersData.length - 1 ? 0 : i + 1;
    await u.updateOne({ $push: { friends: new ObjectId(usersData[i]._id) } });
  })

  res.status(201).json({ msg: 'seeded', thoughtsData, usersData });
}

module.exports = seed;