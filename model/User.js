const { Schema, model, default: mongoose } = require('mongoose');
const Thought = require('./Thought');

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
  if (doc) {
    await Thought.updateMany({ _id: { $in: doc.thoughts } }, { username: doc.username });
  }
})

userSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await Thought.deleteMany({ _id: { $in: doc.thoughts } });
  }
})

const User = model('user', userSchema);

module.exports = User;