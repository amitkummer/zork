# Zork: The Great Underground Empire - Vue Edition

## Setup

Make sure to install the dependencies

```bash
npm ci
```

## Development

Start the development server on http://localhost:3000

```bash
npm run dev
```

### Linting

The `vue3` docs include a [guide](https://vuejs.org/guide/scaling-up/tooling.html#linting) for using `eslint`. 

Run `eslint` from the command line:

```bash
npm run eslint 
```

Note: this will also report any errors `prettier` finds. For more information on this prettier-eslint integration, see the comments in `.eslintrc`.  

Run 'stylelint' from the command line:

```bash
npm run stylelint
```

Running `stylelint`, `eslint` and `prettier` in a single command:

```bash
npm run lint
```

To fix `stylelint` errors use `stylelint --fix`.


## Production

Build the application for production:

```bash
yarn build
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/docs/deployment).
