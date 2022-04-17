# Zork: The Great Underground Empire - Vue Edition

## Setup

Make sure to install the dependencies

```bash
npm ci
```

## Development

Start the development server on http://localhost:3000

```bash
npm run dev -- -o
```

### Linting

The `vue3` docs include a [guide](https://vuejs.org/guide/scaling-up/tooling.html#linting) for using `eslint`. 

Run `eslint` from the command line:

```bash
npm run lint
```

Note: this will also report any errors `prettier` finds. For more information on this prettier-eslint integration, see the comments in `.eslintrc`.  


## Production

Build the application for production:

```bash
yarn build
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/docs/deployment).
