# Société Numérique Website

<h2 id="about">🪧 About</h2>

[Société Numérique website](https://www.societenumerique.gouv.fr) has moved to [anct.gouv.fr](https://anct.gouv.fr/programmes-dispositifs/societe-numerique).

This repository only contains an [nginx](https://nginx.org/) container that permanently redirects (`301`) every request to the new location, regardless of the requested path.

## 📑 Table of Contents

- 🪧 [About](#about)
- 🚀 [Usage](#usage)
- 📝 [License](#license)

<h2 id="usage">🚀 Usage</h2>

```bash
docker build -t website .
docker run --rm -p 8080:8080 website
curl -I http://localhost:8080/any/path
```

The listening port is read from the `PORT` environment variable, which is provided by Scaleway serverless containers at runtime.

Pushing on `main` builds the image, pushes it to the Scaleway container registry and deploys the serverless container.

<h2 id="license">📝 License</h2>

See the repository's [LICENSE.md](./LICENSE.md) file.
