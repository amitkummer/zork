# Zork: The Great Underground Empire - Vue Edition

## Setup

Make sure to install the dependencies

```bash
# --legacy-peer-deps is required for installing pinia.
# https://github.com/vuejs/pinia/issues/853
npm ci --legacy-peer-deps
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

## Deployment

Generate the site:

```bash
npm run build
```

Checkout the [static hosting guide](https://v3.nuxtjs.org/guide/deploy/static-hosting/).
