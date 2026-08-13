# Typescript-Template

Github template for typescript projects

## Setup

- Install Homebrew
- Install `Brewfile`
  - `brew install bundle`
- Setup `fnm`
  - `just setup-fnm`
- Install dependencies
  - `npm install`

## Commands

- `npm run build` - compile typescript
- `npm run test` - run unit tests
- `npm run test:watch` - run unit tests in verbose mode
- `npm run lint` - lint src and test code
- `npm run lint:fix` - lint and fix src and test code
- `npm run ci` - CI command for running unit tests, linting project, and compiling typescript
