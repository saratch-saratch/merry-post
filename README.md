# Merry Post

## Overview

companyForum! is a web forum application that enables you to create new topics and media links to share with your friends. It also allows you to communicate with friends in your group freely and discuss the things you love.

### Problem

Nowadays, there are many social media apps to choose from, but most of them can leave you feeling overwhelmed and detached, while also raising concerns about your privacy. In contrast, we believe that having a small, niche yet dynamic forum app in your hands can create a sense of ownership and belonging within your own community.

### User Profile

Our main target users are groups of people who want to stay updated with the news and share them with their friends or colleagues. But due to the versatility of the forum application, any community or organization can apply this application to their own groups.

### Features

- User authentication and authorization.
- Dynamic post feed and comments.
- Dynamic menu for edit and delete post/comment.
- Ability for users to create new topic with media url.
- Post editing.
- Comment message bar.
- User profile settings.

### Tech Stack

- TypeScript
- Authoprefixer
- React
- Next.js
- Post CSS
- Talwind CSS
- Prettier
- Google Fonts
- React Icons
- SWR
- Moment.js
- Prisma ORM
- PostgreSQL
- NextAuth.js

## Implementation

### Sitemap

- Sign in page (/signin)
- Sign up page (/signin/signup)
- Homepage (/home)
- Post page (/home/postId)
- Edit post page (home/postId/edit)
- Create new post page (/home/create)
- Profile settings page (/home/settings)

### Auth

This application was made with JWT authentication for both client-side and server-side using NextAuth.js custom provider.

## Nice-to-haves

- Edit user's comments feature.
- Add user image.
- View counter and like features.
- Search for posts and comments feature.
- Deploy an application to Vercel and Neon.
- More options for theme and layout customizations.

## Installation and initialization

- Install Node.js and npm.
- Clone the repository to application directory.
- Run `npm install` to install all dependencies.
- Create postgresql database.
- Create .env file with same variable names with .env.sample.
- Initialize Prisma by running the following commands on terminal:
  - `npx prisma migrate`
  - `npx prisma migrate dev`
  - `npx prisma generate`
  - `npx prisma db seed`
