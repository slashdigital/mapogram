# TypeScript Next.js example

This is a really simple project that shows the usage of Next.js with TypeScript.

## Preview

Preview the example live on [StackBlitz](http://stackblitz.com/):

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/vercel/next.js/tree/canary/examples/with-typescript)

## Deploy your own

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-typescript&project-name=with-typescript&repository-name=with-typescript)

## How to use it?

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npx create-next-app --example with-typescript with-typescript-app
# or
yarn create next-app --example with-typescript with-typescript-app
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

## Database Migration

### How to Create Migration


Command for prisma

 ./node_modules/.bin/prisma init  

 ./node_modules/.bin/prisma format   

./node_modules/.bin/prisma generate   

./node_modules/.bin/prisma migrate dev  

Add `"migrate": "node-pg-migrate"` to scripts section of package.json so you are able to quickly run commands.

Run `npm run migrate create my first migration`. It will create file xxx_my-first-migration.js in migrations folder. Open it and change contents to:

```
exports.up = (pgm) => {
  pgm.createTable('users', {
    id: 'id',
    name: { type: 'varchar(1000)', notNull: true },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
  pgm.createTable('posts', {
    id: 'id',
    userId: {
      type: 'integer',
      notNull: true,
      references: '"users"',
      onDelete: 'cascade',
    },
    body: { type: 'text', notNull: true },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
  pgm.createIndex('posts', 'userId')
}
```
Save migration file.

### How to Run Migration

Now you should put your DB connection string to `DATABASE_URL` environment variable and run `npm run migrate up`. (e.g. `DATABASE_URL=postgres://test:test@localhost:5432/test` and `npm run migrate up`)

You should now have two tables in your DB!

### How to Rollback Migration

If you want to rollback migration table, you should change content of migration file in migrations directory, change its content to:

```
exports.down = pgm => {
    pgm.dropTable('users', {
        ifExists: true,
        cascade: true,
    })

    pgm.dropTable('posts', {
        ifExists: true,
        cascade: true
    })
};
```
Now you should run `npm run migrate down` for rollback migration.

## If you're using Docker

After pull the project, find out the .env.example file in the `root directory`.

If you found the file, do this command:

```bash
cp .env.example .env
```

After copy the file, there are some configuration that you need to concern, but it's up to you, I mean the `.env` file has default value for configuration.

If the `.env` file seems right to you, do this command:

```bash
docker-compose up 
```
Let's waiting for the process, and voila!

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Notes

This example shows how to integrate the TypeScript type system into Next.js. Since TypeScript is supported out of the box with Next.js, all we have to do is to install TypeScript.

```
npm install --save-dev typescript
```

To enable TypeScript's features, we install the type declarations for React and Node.

```
npm install --save-dev @types/react @types/react-dom @types/node
```

When we run `next dev` the next time, Next.js will start looking for any `.ts` or `.tsx` files in our project and builds it. It even automatically creates a `tsconfig.json` file for our project with the recommended settings.

Next.js has built-in TypeScript declarations, so we'll get autocompletion for Next.js' modules straight away.

A `type-check` script is also added to `package.json`, which runs TypeScript's `tsc` CLI in `noEmit` mode to run type-checking separately. You can then include this, for example, in your `test` scripts.

