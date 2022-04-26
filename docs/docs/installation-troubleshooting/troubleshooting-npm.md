# Troubleshooting NPM

> Sometimes you get `errors` or `confusions` when running `npm` commands.  
> Here are some common solutions to come out of those situations.

---

### Getting file permission error like `EACCESS`?

Run npm command with `sudo` (Linux/MacOS) or `Run as Administrator`(Windows).

---

### Install a Specific version of a package

Add `@` after package name and enter desired version.

```shell
npm i [package]@[version]
```

---

### Problem Installing a Global Packages?

1. Clear npm cache using :

```shell
npm cache clean --force
```

2. Try again.

---

### Problem Installing Local Packages?

1. Remove `node_modules` folder.
1. Run `npm i` again.
1. This does the trick most of the times.

---

### Updating Dependencies

#### Updating to latest compatible version based on `package.json`

1. Run `npm update` to update all dependencies to the latest compatible version.
1. Run `npm update [package]` to update single package to the latest compatible version.

#### Updating dependencies to latest versions

1. Use [npm-check-update](https://www.npmjs.com/package/npm-check-updates) package to check and update dependencies for updates.
