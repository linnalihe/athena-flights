# Athena Flights
A fantasy flight booking web app that allows users to reserve seats on future rocket launches. Check out the live website at [athena-flights.vercel.app](https://athena-flights.vercel.app/)

![Athena Flights screen shot](/athena-flights-screen-shot.png)

## Technologies
### Front-end
* [Next.js](https://nextjs.org/): React framework for server-side rendering
* [Material-UI](https://material-ui.com/): user interface component library
* [Apollo Client](https://www.apollographql.com/docs/react/): state management library to manage data with GraphQL 

### Back-end
* [Node.js](https://nodejs.org/): JavaScript runtime environment
* [Express.js](https://expressjs.com/): framework used to create a GraphQL endpoint
* [GraphQL](https://graphql.org/): data query and manipulation language
* [Apollo Server](https://www.apollographql.com/docs/apollo-server/): GraphQL server
* [TypeORM](https://typeorm.io/): object relational mapping package to work with PostgreSQL
* [PostgreSQL](https://www.postgresql.org/): relational database

### Authentication
* [NextAuth.js](https://next-auth.js.org/): authentication library used to implement OAuth

## Installation
The steps below will describe how to install the app in your local environment.

### Setting Up Your Environment
#### 1. Clone or fork this repository and make sure you have the files locally
```bash
$ git clone https://github.com/linnal86/athena-flights.git
```

#### 2. Make sure you have node.js and npm installed

### Setting Up the Server and Database
#### 1. Make sure you're in the `server` directory

#### 2. Install dependencies
```bash
$ npm install
```

#### 3. [Set up PostgreSQL](https://www.tutorialspoint.com/postgresql/postgresql_environment.htm) locally and [create a database](https://www.tutorialspoint.com/postgresql/postgresql_create_database.htm) locally

#### 4. NextAuth (used for authentication) persists user information in the database, so you'll need to set up a few tables. From the terminal, access your database using `psql <database-name>` and use the following SQL queries to create tables.
```sql
CREATE TABLE accounts
  (
    id                   SERIAL,
    compound_id          VARCHAR(255) NOT NULL,
    user_id              INTEGER NOT NULL,
    provider_type        VARCHAR(255) NOT NULL,
    provider_id          VARCHAR(255) NOT NULL,
    provider_account_id  VARCHAR(255) NOT NULL,
    refresh_token        TEXT,
    access_token         TEXT,
    access_token_expires TIMESTAMPTZ,
    created_at           TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at           TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  );

CREATE TABLE sessions
  (
    id            SERIAL,
    user_id       INTEGER NOT NULL,
    expires       TIMESTAMPTZ NOT NULL,
    session_token VARCHAR(255) NOT NULL,
    access_token  VARCHAR(255) NOT NULL,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  );

CREATE TABLE users
  (
    id             SERIAL,
    name           VARCHAR(255),
    email          VARCHAR(255),
    email_verified TIMESTAMPTZ,
    image          TEXT,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    booked_launches      INTEGER[],
    PRIMARY KEY (id)
  );

CREATE TABLE verification_requests
  (
    id         SERIAL,
    identifier VARCHAR(255) NOT NULL,
    token      VARCHAR(255) NOT NULL,
    expires    TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  );

CREATE UNIQUE INDEX compound_id
  ON accounts(compound_id);

CREATE INDEX provider_account_id
  ON accounts(provider_account_id);

CREATE INDEX provider_id
  ON accounts(provider_id);

CREATE INDEX user_id
  ON accounts(user_id);

CREATE UNIQUE INDEX session_token
  ON sessions(session_token);

CREATE UNIQUE INDEX access_token
  ON sessions(access_token);

CREATE UNIQUE INDEX email
  ON users(email);

CREATE UNIQUE INDEX token
  ON verification_requests(token);
```

#### 5. Create a `.env` file with the following variables
```
PORT=4000
DATABASE_URL=postgresql://<user>:<password>@localhost:5432/<database-name>
```

#### 6. Compile TypeScript code and run the server
```
$ npm run watch
$ npm run dev
```

### Setting Up the Client
#### 1. Make sure you're in the `client` directory

#### 2. Install dependencies
```
$ npm install
```

#### 3. Create an OAuth apps for Facebook, GitHub, and [Recurse Center](https://www.recurse.com/settings/apps). If applicable, set the redirect URI to `http://localhost:3000/api/auth/callback/<nextauth-app-id>` (e.g. the `nextauth-app-id` for Recurse Oauth would be "recurse", which is set in [client/pages/api/auth/\[...nextauth\].js](https://github.com/linnal86/athena-flights/blob/2a3a89125dfaed46b5abd8cc1f12d97c3b6e3d0c/client/pages/api/auth/%5B...nextauth%5D.js#L20)).  Save the IDs and secrets for step 5.

#### 5. Create a `.env.local` file with the following variables
```
# OAuth Info
RECURSE_ID=<The ID from your Recurse Center settings>
RECURSE_SECRET=<The secret from your Recurse Center settings>

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

FACEBOOK_ID=
FACEBOOK_SECRET=

NEXTAUTH_URL=http://localhost:3000/

# GraphQL API URL
NEXT_PUBLIC_API_URL=http://localhost:4000/

# Database URL (should the be same as the url in your server/.env)
DATABASE_URL=postgresql://<user>:<password>@localhost:5432/<database-name>
```

#### 6. Run the client
```
$ npm run dev
```
