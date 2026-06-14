# Render Deployment

## Deploy From GitHub

1. Open Render and create a new web service from the GitHub repo.
2. Use the root directory `yelpcamp`.
3. Build command:

```bash
npm install
```

4. Start command:

```bash
npm start
```

5. Add environment variables:

```text
DB_URL=<your MongoDB Atlas connection string>
SESSION_SECRET=<a long random secret>
NODE_ENV=production
```

## Important

Do not commit real database URLs, passwords, or `.env` files to GitHub.

If a MongoDB URL or password has been shared in chat or committed anywhere, rotate the password in MongoDB Atlas before using the app publicly.
