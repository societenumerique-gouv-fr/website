# Contribution Guide

## 📑 Table of Contents

- 📦 [Prerequisites](#prerequisites)
- 🚀 [Getting started](#getting-started)
- 🛠️ [Available Scripts](#available-scripts)
- 🤝 [Requirements](#requirements)
- 🏗️ [Built with](#built-with)
- 🏷️ [Versioning](#versioning)

<h2 id="prerequisites">📦 Prerequisites</h2>

Make sure you have the following tools installed before setting up the project:

- [Git](https://git-scm.com/): Distributed version control system
- [Node.js](https://nodejs.org/): Runtime environment for JavaScript
- [pnpm](https://pnpm.io/): Package Manager for Node.js projects

### Recommendation

> For easier Node.js management, consider using [nvm](https://github.com/nvm-sh/nvm), which allows you to quickly obtain and use different versions of Node.js via the command line.

<h2 id="getting-started">🚀 Getting started</h2>

Follow these steps to set up the project:

### 1. Clone the repository locally

```bash
git clone git@github.com:societenumerique-gouv-fr/website.git
```

### 2. Install project dependencies

```bash
cd website
pnpm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Update values marked as `tobemodified`

- `NEXT_PUBLIC_STRAPI_URL` is the base url of the CMS hosting website content

After completing these steps, you're ready to start working on the project. Happy coding! 🎉

<h2 id="available-scripts">🛠️ Available Scripts</h2>

These commands are essential for application development:

### `pnpm dev`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will automatically reload if you make edits.\
You will also see any lint errors in the console.

### `pnpm build`

Builds the app for production in the `build` folder.\
It optimizes the build, correctly bundling React in production mode.

The build is minified, and the filenames include hashes.\
Your app is ready for deployment!

### `pnpm start`

Start the app in the `build` folder to run the Next.js server in production mode after the build process is completed.

### `pnpm test`

Launches [Vitest](https://vitest.dev/) test runner.

Tests will automatically rerun if you make edits.

### `pnpm lint.es`

Performs static analysis of the project's source in the `src/` folder.

### `pnpm lint.style`

Performs static analysis of the project's style sheets in the `src/` folder.

### `pnpm lint.commit`

Checks the syntax of all commits made since the last common commit with the `main` branch.

### `pnpm prettier`

Fixes the syntax of all project files.

<h2 id="requirements">🤝 Requirements</h2>

### Branches

- **Keep Branches Up-to-Date**: Branches should be kept up-to-date with the main branch using a rebased, linear history
- **Use Conventional Prefixes**: When creating new branches, ensure they are prefixed with one of the following categories: `build/`, `chore/`, `ci/`, `docs/`, `feat/`, `fix/`, `perf/`, `refactor/`, `revert/`, `style/` or `test/`, depending on the nature of the changes. Refer to the [Conventional Commits cheat sheet](https://kapeli.com/cheat_sheets/Conventional_Commits.docset/Contents/Resources/Documents/index) to learn more about these categories

### Commits

- **Follow Conventional Commits**: Commit messages must adhere to the [Conventional Commits](https://www.conventionalcommits.org/fr) specification. Please follow these guidelines for writing valid commit messages
- **Signed Commits**: Ensure that commits are signed using a GPG key. Refer to [About commit signature verification](https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification) for more information on setting it up

### Feature branch workflow

1. **Create Your Feature Branch**: Use `git checkout -b feat/amazing-feature` to create a new branch for your changes
2. **Commit Your Changes**: Make your changes and commit them with a descriptive message. For example, `git commit -m "feat: add some amazing feature"`
3. **Push to the Branch**: Push your feature branch to the remote repository with `git push origin feat/amazing-feature`
4. **Open a Pull Request**: Once your changes are pushed, open a Pull Request against the main branch. Provide details about the changes and request a review from collaborators.

<h2 id="built-with">🏗️ Built with</h2>

### Langages & Frameworks

- [TypeScript](https://www.typescriptlang.org/): the main programming language used here, it is an open-source language that builds on JavaScript by adding static typing
- [React](https://react.dev/): a declarative and efficient JavaScript library for building interactive user interfaces
- [Next.js](https://nextjs.org/): a React Framework for building full-stack web applications.

### Continuous Integration

- [GitHub Actions](https://docs.github.com/en/actions): GitHub's built-in integration and continuous deployment tool
  - Workflow runs are available [under Actions tab](https://github.com/societenumerique-gouv-fr/website/actions)

[//]: # 'TODO: Finish'

- Actions variables:
  - `NEXT_PUBLIC_STRAPI_URL` The root url of the Content Management system, you can get this in `content-management-system infrastructure` terraform run outputs
  - `SCW_CONTAINER_ID` Scaleway container to restart with latest version of Docker image, in can be found in `content-management-system infrastructure` terraform run outputs (without region)
  - `SCW_CONTAINER_REGISTRY`: Scaleway Docker registry endpoint to publish the Docker image build in the CI
  - `SCW_SECRET_KEY`: Scaleway secret key to give access to the Docker registry and the serverless container API
- Workflows:
  - [Validate feature branch](./.github/workflows/validate-feature-branch.yml): Runs on every branch starting with a conventional prefix. It checks code quality before merging into the `main` branch
  - [Deploy Scaleway Serverless Container](.github/workflows/deploy-scaleway-serverless-container.yml): Runs on every merge into the `main` branch. It builds and publishes and run a container hosting the website

### Continuous Deployment

- [Scaleway](https://www.scaleway.com/): Cloud computing and web hosting provider. Content management system is containerized and deployed on a serverless container.

<h2 id="versioning">🏷️ Versioning</h2>

This project follows [Semantic Versioning 2.0.0](https://semver.org/) specification for version naming, ensuring a clear release cycle and promoting backward compatibility.
