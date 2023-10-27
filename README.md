# 18 NoSQL: Social Network API

## Description

This is a backend application utilized to transfer data through the use of MongoDB as the database source. Similar to how facebook works, this app works to show the back end transfer. Create your own data using objects and the proper routes as described below to see users created, user-thoughts and reactions to the thoughts. A video below walks you through how to do that. 

Because this application won’t be deployed, you’ll also need to create a walkthrough video that demonstrates its functionality and all of the following acceptance criteria being met. You’ll need to submit a link to the video and add it to the README of your project.

## Installation
1. `npm install`
- This will install the packages as listed on the package.json file. 
- Express, Moment, Mongoose installed


## Getting Started

After cloning the repo to a local folder, install node modules as listed in the installation instructions. Once installed, use the routes listed in the models for user and thought to add. They are also listed here:

Create User:
POST: `http://localhost:3001/api/user`

Find Single User:
GET: `http://localhost:3001/api/user/:user_Id`

Find All Users:
GET: `http://localhost:3001/api/user`

Update User:
PUT: `http://localhost:3001/api/user/:user_Id`

Delete User:
DELETE: `http://localhost:3001/api/user/:user_Id`

Create Thought:
POST: `http://localhost:3001/api/thoughts`

Delete Thought:
DELETE: `http://localhost:3001/api/thoughts/:thought_Id`

Retrieve All Thoughts:
GET: `http://localhost:3001/api/thoughts`

Get Single Thought:
GET: `http://localhost:3001/api/thoughts/:thought_Id`

Update Thought:
PUT: `http://localhost:3001/api/thoughts/:thought_Id`

Create Reaction:
POST: `http://localhost:3001/api/thoughts/:thought_Id/reactions`

Delete Reaction:
DELETE: `http://localhost:3001/api/thoughts/:thought_Id/reactions/:reaction_Id`

## Video WalkThrough

Video URL: ` `

Credit: 
1) BCS Assistants
2) UNC CH BootCamp Staff
3) UNC CH BootCamp Classmates