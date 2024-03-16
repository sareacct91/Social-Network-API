const connection = require('../../config/connection');
const { Thought, User } = require('../../model');
const { getRandomUser, getReaction, randomPick, getThought } = require('./data');
const { ObjectId } = require('mongoose').Types
const type = require('../typedef');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function seed(req, res) {
  // drop all collections in db
  (await connection.db.listCollections().toArray()).map((e) => e.name).forEach((e) => connection.dropCollection(e));

  const users = getUsersObject();
  const thoughts = getThoughtObject(users);

  const thoughtsData = await Thought.create(thoughts);
  const usersData = await User.create(users);

  // seed user thoughts array
  thoughtsData.forEach(async (t) => {
    const i = usersData.findIndex((u) => u.username === t.username);
    await usersData[i].updateOne({ $push: { thoughts: new ObjectId(t._id) } });
  })

  // seed user friends array
  usersData.forEach(async (u, i) => {
    i = i === usersData.length - 1 ? 0 : i + 1;
    await u.updateOne({ $push: { friends: new ObjectId(usersData[i]._id) } });
  })

  res.status(201).json({ msg: 'seeded', thoughtsData, usersData });
}


function getUsersObject() {
  /**@type {type.user[]}*/
  const users = new Array(50);

  for (let i = 0; i < users.length; i++) {
    const username = getRandomUser();
    const email = `${username}@email.com`;

    users[i] = { username, email };
  }

  return users;
}

/**
 * @param {type.user[]} users
 */
function getThoughtObject(users) {
  /**@type {type.thought[]}*/
  const thoughts = new Array(100);

  for (let i = 0; i < thoughts.length; i++) {
    const thoughtText = getThought();
    const username = /**@type {type.user}*/(randomPick(users)).username;

    /**@type {type.reaction[]}*/
    const reactions = new Array(20);

    for (let i = 0; i < reactions.length; i++) {
      const reactionBody = getReaction();
      const username = /**@type {type.user}*/(randomPick(users)).username;

      reactions[i] = { reactionBody, username };
    }

    thoughts[i] = { thoughtText, username, reactions };
  }
  return thoughts;
}

module.exports = seed;