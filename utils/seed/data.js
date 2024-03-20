const { User } = require('../../model');

const names = [
  "Liam",
  "Olivia",
  "Noah",
  "Emma",
  "Oliver",
  "Ava",
  "Elijah",
  "Charlotte",
  "William",
  "Sophia",
  "James",
  "Amelia",
  "Benjamin",
  "Isabella",
  "Lucas",
  "Mia",
  "Henry",
  "Evelyn",
  "Alexander",
  "Harper",
  "Michael",
  "Abigail",
  "Ethan",
  "Emily",
  "Daniel",
  "Elizabeth",
  "Matthew",
  "Avery",
  "Jackson",
  "Sofia",
  "Sebastian",
  "Ella",
  "Aiden",
  "Madison",
  "David",
  "Scarlett",
  "Joseph",
  "Victoria",
  "Carter",
  "Grace",
  "Owen",
  "Chloe",
  "Wyatt",
  "Camila",
  "John",
  "Luna",
  "Jack",
  "Nora",
  "Luke",
  "Penelope"
];

const reactionBodies = [
  "This is amazing!",
  "Great job!",
  "Interesting perspective.",
  "I agree with this.",
  "Well said!",
  "Love it!",
  "Awesome!",
  "I'm impressed!",
  "Absolutely!",
  "Fascinating!",
  "Insightful!",
  "Very informative.",
  "Brilliant!",
  "So true.",
  "Incredible!",
  "Fantastic work!",
  "Exactly!",
  "Wonderful!",
  "I'm inspired!",
  "Such a valuable post.",
  "Well articulated.",
  "Spot on!",
  "This deserves more attention.",
  "Superb!",
  "Couldn't agree more.",
  "Exceptional!",
  "I'm amazed!",
  "This resonates with me.",
  "Top-notch!",
  "Remarkable!",
  "Impressive!",
  "I'm captivated!",
  "This is gold!",
  "Thank you for sharing!",
  "This made my day!",
  "Very well written.",
  "I'm blown away!",
  "This needs to be shared widely.",
  "So insightful!",
  "Beautifully written.",
  "This is invaluable!",
  "A must-read!",
  "This is powerful!",
  "I'm moved!",
  "Absolutely brilliant!",
  "Kudos!",
  "This is a game-changer!",
  "So profound!",
  "This is exceptional!",
  "I'm touched!"
];

const thoughtTexts = [
  "What if we're all just characters in someone else's dream?",
  "The universe is not required to be in perfect harmony with human ambition.",
  "The journey of a thousand miles begins with a single step.",
  "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",
  "Life is what happens when you're busy making other plans.",
  "In three words I can sum up everything I've learned about life: it goes on.",
  "The only thing necessary for the triumph of evil is for good men to do nothing.",
  "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
  "The mind is everything. What you think you become.",
  "You must be the change you wish to see in the world.",
  "The only true wisdom is in knowing you know nothing.",
  "In the end, it's not the years in your life that count. It's the life in your years.",
  "Be the change that you wish to see in the world.",
  "Life is like riding a bicycle. To keep your balance, you must keep moving.",
  "Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate: only love can do that.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "Our greatest glory is not in never falling, but in rising every time we fall.",
  "It does not matter how slowly you go as long as you do not stop.",
  "The only way to do great work is to love what you do.",
  "Happiness is not something ready made. It comes from your own actions."
];

/**
  @param {string[]|import("../typedef").user[]|User} arr
 */
const randomPick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomUser = () => `${randomPick(names)}${randomPick(names)}`;
const getReaction = () => `${randomPick(reactionBodies)}`
const getThought = () => `${randomPick(thoughtTexts)}`

module.exports = {getRandomUser, getReaction, randomPick, getThought};