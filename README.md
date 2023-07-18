
# Postify

## 📝 Description

"Social Postify" is a web application that allows users to create and schedule posts for multiple social media platforms such as Facebook, Instagram, Twitter, and LinkedIn. Users can create customized posts with images, headlines, text, and select specific dates and times for each post. The system supports scheduling multiple posts and provides a clear overview of the scheduled posts.

Additionally, "Social Postify" features an alert mechanism that notifies users, the owners of the posts, when they should publish the post. This way, users don't forget when to post and can keep their social media accounts up to date.


## API Documentation

#### Signup Route

```http
  POST /auth/signup
```

| Params   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | User name |
| `email` | `string` | User e-mail |
| `password` | `string` | User password |
| `avatar` | `string` | user avatar link |

#### Signin Route

```http
  POST /auth/signin
```

| Params   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | User e-mail |
| `password` | `string` | User password |

#### Create a publication route

```http
  POST /publication
```

| Params   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `image` | `link` | Image link of publication |
| `title` | `string` | Publication title |
| `text` | `string` | Publication description |
| `dateToPublish` | `Date` | Publish date |
| `published` | `boolean` | is published? |
| `socialMedia` | `string` | Social media where publication will be published |

#### Get all publications from user

```http
  GET /publications
```

## Technologies


- ![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)

- ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

- ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

- ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)


## Enviroments Variables

To run this projects, you will need this envioroments variables on your .env:

`DATABASE_URL`

`JWT_SECRET_KEY`

