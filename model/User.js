const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: /^([a-z0-9\._-]+)@([a-z0-9\.-]+)\.([a-z]{2,6})$/i,
  },
  thoughts: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'thought',
    }],
  },
  friends: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'user',
    }],
  },
}, {
  toJSON: {
    virtuals: true,
  },
  id: false,
});

userSchema.virtual('friendCount')
  .get(function() {
    return this.friends.length;
  })

userSchema.post('findOneAndUpdate', async function (doc) {
  if (doc && doc.thoughts.length) {
    const oldUsername = (await model('thought').findById(doc.thoughts[0])).username;
    const q1 = model('thought').updateMany({ _id: { $in: doc.thoughts } }, { username: doc.username }).exec();
    const q2 = model('thought').updateMany({ 'reactions.username': oldUsername }, { $set: { 'reactions.$[element].username': doc.username } }, {arrayFilters: [{'element.username': oldUsername}]}).exec();

    const [res1, res2] = await Promise.all([q1, q2]);
    console.log(res1, res2);
  }
})

userSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await model('thought').deleteMany({ _id: { $in: doc.thoughts } });
  }
})

const User = model('user', userSchema);

module.exports = User;