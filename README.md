# amazon-bibliographic-information-to-scrapbox

Amazonのページから書誌情報を Scrapbox に取り込むブックマークレットです。元ネタ: https://rashita.net/blog/?p=26075

## Development

### Setup

```sh
npm install
npm run watch
```

### Commit

Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). [git-cz](https://github.com/streamich/git-cz) is useful.

```sh
npx git-cz
```

## Release

1. Run `npm run release` on main branch.

```sh
git switch main
npm run release
```

1. Release Pull Request is created by the above command. Review and merge the PR into main branch.

1. GitHub Actions releases the main branch.
