# Components Standards

<!-- prettier-ignore -->
| Name | Details |
| --------- | ------- |
| **File Extension** | `.svelte` |
| **File Name**| `ContactUsForm.svelte` - **UpperCamelCase** format |
| **Importing Child Components** | `import Child from '/path/Child.svelte` |
| **Using Child Components** | `<Child />` |
| **Declaring Props** | `export let propName = 'default_value';` |
| **Passing Props** | `<Child propName={'other_value'}>` |
| **Variable Names** | `propName` - **lowerCamelCase** format |
| **Variable declaration** | - Use `const` for variables which are not reassigned.<br> - Use `let` for variables which are reassigned. |
| **Supported Script Languages** | `javascript` - Default <br>`typescript`, `coffescript`, `babel` - Using [Svelte Preprocess](https://github.com/sveltejs/svelte-preprocess) |
| **Supported Markup Languages** | `html` - Default <br>`pug` - Using [Svelte Preprocess](https://github.com/sveltejs/svelte-preprocess) |
| **Supported Style Languages** | `css` - Default <br>`scss`, `postCSS`, `stylus`, `less` - Using [Svelte Preprocess](https://github.com/sveltejs/svelte-preprocess) |
| **Preferred Order of Code** | `<script context="module">`<br>`<script>`<br>`<svelte:*>`<br>`html markup`<br>`<style>` |
| **Using Typescript** | `<script lang="ts">` |
| **Using SCSS** | `<style lang="scss">` |
