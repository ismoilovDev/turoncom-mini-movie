# Technical task

**Assignment**

- You have to create mini movie website in **Next.JS**:
- You should share **your source code** (github repo) and **your work url** (which is deployed Vercel or Netlify). Please, don't forget this!

1. **Main task**.

   - It should include that:

   1. Movies list
   2. Movie list Pagination
   3. Each movie card element consists of movie poster, title and year.

2. **Movie details**.
   - It should include that:
   1. Poster
   2. Movie title
   3. Movie description
   4. Movie year
   5. Movie country
   6. Movie genre
   7. Demo player (It has to contain any video you want. Custom Video player is more prefered)
   8. Employees (who perform an action in the movie) images

**Deadline** - 3 days until _(12.10.2023 10:55)_

- **If your date is expired, the given APIs will not work. Please, try to submit your work till the deadline**

**Main URL: `https://api.cinerama.uz/api-test`**

- Your Request Header:

```ts
{
  "secret-token": "2588c96d-909b-4be7-bb95-423d617f7b12"
}
```

1. API to get Movies list:
   **`https://api.cinerama.uz/api-test/movie-list?page=1&items=20`**

- Request method: **GET**
- **page (in query)** - is used to paginate movies list
- **items (in query)** - is movies number in each page

**Response like this:**

```ts
{
  "status": boolean,
  "code": number,
  "message": string,
  "data": {
    "total": number,
    "lastPage": number,
    "currentPage": number,
    "movieList": Array<{
      "id": number,
      "modulId": number,
      "cardType": string,
      "poster": string,
      "title": string,
      "title_en": string,
      "year": number,
      "quality": string,
      "age_limit": number,
      "is_serial": boolean,
      "is_new": boolean,
      "is_favourite": boolean,
      "genres": Array<{
        "id": number,
        "title": string,
        "order_position": string
      }>
    }>
  }
}
```

2. API to get Movie details:
   **` https://api.cinerama.uz/api-test/movie-detail?id=222`**

- Request method: **GET**
- **id (in query)** - is movie id

**Response like that:**

```ts
{
  "status": string,
  "code": number,
  "message": string,
  "data": Array<{
    "id": number,
    "poster": string,
    "title": string,
    "title_en": string,
    "description": string,
    "moduleId": number,
    "movie_slug": string,
    "budget": string,
    "slogan" string,
    "year": number,
    "is_favourite": boolean,
    "age_limit": number,
    "is_serial": boolean,
    "is_free": boolean,
    "upload_time": number,
    "created_at": string,
    "countries": Array<{
      "id": number,
      "title": string
    }>,
    "genres": Array<{
      "id": number,
      "title": string
    }>,
    "kp_rating": number,
    "imdb_rating": number,
    "people": Array<{
      "post": string,
      "employees": Array<{
        "id": number,
        "full_name": string,
        "full_name_en": string,
        "photo": string
      },
      {
        "post": string,
        "employees": Array<{
          "id": number,
          "full_name": string,
          "full_name_en": string|null,
          "photo": string
        }>
      }>
    }>,
    "files": Array<{
      "id": number,
      "poster": string,
      "fileSize": number,
      "quality": string,
      "fileDuration": number,
      "fileWidth": number,
      "fileHeight": number,
      "isWatched": boolean,
      "lastPosition": number
    }>
  }>
}
```
