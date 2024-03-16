const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    maxLength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (v) => v.toLocaleString(),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
}, {
  toJSON: {
    virtuals: true,
  },
  id: false,
});

thoughtSchema.virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  });


thoughtSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await model('user').findOneAndUpdate({username: doc.username}, {$pull: {thoughts: doc._id}})
  }
})


const Thought = model('thought', thoughtSchema);

module.exports = Thought;