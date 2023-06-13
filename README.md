# Merry Post

## Overview

companyForum! is a web forum application that enables you to create new topics and media links to share with your friends. It also allows you to communicate with friends in your group freely and discuss the things you love.

### Problem

Nowadays, there are many social media apps to choose from, but most of them can leave you feeling overwhelmed and detached, while also raising concerns about your privacy. In contrast, we believe that having a small, niche yet dynamic forum app in your hands can create a sense of ownership and belonging within your own community.

### User Profile

Our main target users are groups of people who want to stay updated with the news and share them with their friends or colleagues. But due to the versatility of the forum application, any community or organization can apply this application to their own groups.

### Features

- User login authentication
- Dynamic forum feed and comments
- Ability for users to create new topic with attachments
- Ability for users to create new comments
- Profile setting

### Tech Stack

- Next.js (Fullstack)
- Talwind CSS
- Javascript
- PostgreSQL
- Prisma ORM
- Moment.js
- Google Fonts
- React Icons

## Implementation

### Sitemap

- Login page
- Register page

- Feed (Homepage)
- Topic page (post, comments, comment input box)
- Create topic page
- Edit topic page

- User profile page (Setting)

On tablet and desktop, user can see 2 pages at the time.

### Endpoints

**GET /users**
Lists all users.

**POST /users**
Add new user.

**GET /users/:id**
Lists single user.

**PUT /users/:id**
Edits user.

**DELETE /users/:id**
Deletes user.

**GET /users/:id/topics**
Lists all user's topics.

---

**GET /topics**
Lists all topics.

**POST /topics**
Add new topic.

**GET /topics/:id**
Lists single topic.

**PUT /topics/:id**
Edits topic.

**DELETE /topics/:id**
Deletes topic.

**GET /topics/:id/comments**
Lists all topic's comments.

---

**GET /comments**
Lists all comments.

**POST /comments**
Add new comment.

**GET /comments/:id**
Lists single comment.

**PUT /comments/:id**
Edits comment.

**DELETE /comments/:id**
Deletes comment.

### Auth

- We will create our own JWT authentication for both cliend-side and server-side

## Roadmap

**Sprint 1**

- Create front-end client
- Set up database
- Create back-end API
- Create feed page
- Create topic page

**Sprint 2**

- Create create topic page
- Create edit topic page
- Create comment section
- Create user profile (setting) page

**Sprint 3**

- Create login page
- Create register page
- Create authentication

## Nice-to-haves

- Edit comment feature
- Add user image feature
- View count feature
- Like feature, but using emoji instead
- Search feature
- Deploy to Vercel
- TypeScript version
- More options for theme and layout customizations
