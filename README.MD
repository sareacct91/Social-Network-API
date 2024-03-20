# Social-Network-API    ![license badge](https://img.shields.io/github/license/sareacct91/Social-Network-API)

## Description

An express app to manage users, thoughts, and reactions using mongodb server with mongoose as the ORM

[Video Submission](https://www.youtube.com/watch?v=5P95M_YoonQ)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)


## Installation

require a local mongodb server [Download here](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/)

require insomnia [Download here](https://insomnia.rest/)

clone the repo and npm install


## Usage

Set up your .env file with ```PORT (ie. PORT=3001)``` and ```DB_URI (ie. DB_URI='mongodb://127.0.0.1:27017/socialDB')```

using insomnia, make a ```patch``` request to ```/seed``` to seed the database

For User routes

- ```get /api/users``` get all users
- ```post /api/users``` create a new user with the provided informations ```(username and email)```
- ```get  /api/users/:id``` get specific user
- ```put  /api/users/:id``` update specific user's information ```(username and/or email)```. If username was updated then the username field in associated thoughts and reactions also update
- ```delete /api/users/:id``` delete specific user and associated thoughts
- ```post /api/users/:userId/friends/:friendId``` add a friend to specific user
- ```delete /api/users/:userId/friends/:friendId``` delete a friend from a specific user

For Thought routes

- ```get /api/thoughts``` get all thoughts
- ```post /api/thoughts``` create a new thought with the provided informations ```(thoughtText, username, userId)```
- ```get /api/thoughts/:id``` get specific thought
- ```put /api/thoughts/:id``` update specifc thought's information ```(thoughtText)```
- ```delete /api/thoughts/:id``` delete specifc thought
- ```post /api/thoughts/:id/reactions``` add a reaction to specific thought ```(reactionBody and username)```
- ```delete /api/thoughts/:id/reactions``` delete a reaction from specifc thought ```(reactionId)```

## License

**Social-Network-API** is licensed under the [MIT License](https://github.com/sareacct91/{data.githubRepoName}/blob/master/LICENSE)

## Contributing

[Contributor Covenant](https://www.contributor-covenant.org/)


## Questions

https://github.com/sareacct91

If you have any questions email me at sareacct91@gmail.com