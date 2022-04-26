# Components

Svelte uses a component based Architecture to render the DOM

?> **Official Component Docs :** <i>https://svelte.dev/docs#Component_format</i>

?> Checkout : [**Components Standards**](/components-standards) for a short summary.

## Highlights

-   Components are used as **building blocks** of a **larger Application**.
-   A component has it's own **markup**, **styles** and it's own **logic**. Which is **independent** from all other components.
-   Components can be **nested** inside each other. And can also nest **itself**.
-   Same Component can be **reused** multiple times.
-   We can implement and use **props** of components to change their behaviour absed on props value.
-   We can implement custom **events** on components. Whenever something happens inside a child component, **parent** component can **listen** to it.
-   Svelte Component can declare `<script\>` tag with a **context="module"** attribute **runs once** when the module **first evaluates**, rather than for each component instance. Values declared in this block are accessible from a regular `<script>` (and the component markup) but not vice versa.

## Usecases

-   A `<UserDetails>` component can contain two components named `<PersonalDetails>` and `<AddressDetails>`
-   A `<Page>` component can contain three compoents like `<Header>`, `<PageContent>` and `<Footer>`
-   An `<Item>` component can be rendered 100s of time inside a `<ItemList>` component.
-   `<Header>` and `<Footer>` components can be used in all pages of the Website.
-   A same `<ContactForm>` component can be used in multiple pages of the Web App.
-   We can pass name `John Doe` to a component `<Greeting>` component like `<Greetings name={'John Doe'} />`. It will print `Hello, John doe.`.
-   If we change the value of `name` variable, the component output will also change to new value.
-   `<Login>` component can trigger `on:login` event. When User is successfully logged in.

## Code

A single **component** can be defined in a single `.svelte` file. Component's code consists of `script` (js), `markup` (html) and `style` (css).

```html
<!-- Component.svelte -->
<script context="module">
    // context logic goes here
    const title = "Welcome";
</script>

<script>
    // logic goes here
    const name = "World";
</script>

<!-- Svelte specific tags <svelte:*> (zero or more items) go here, for example : -->
<svelte:head>
    <title>{title}</title>
</svelte:head>

<!-- html markup (zero or more items) goes here, for example -->
<h1>Hello {name}</h1>
<p>How are you?</p>

<style>
    /* styles go here */
</style>
```

## Nesting (parent-child)

```html
<!-- Child.svelte -->
<script>
    export let name = "World";
</script>

<h1>Hello {name}</h1>
```

```html
<!-- Parent.svelte -->
<script>
    import Child from "./Child.svelte";
    const userName = "John";
</script>

<Child name="{userName}" />
<p>How are you</p>
```

## Reusing

```html
<!-- Parent.svelte -->
<script>
    import Child from "./Child.svelte";
    const userName = "John";
    const fatherName = "Andrew";
</script>

<Child name="{userName}" />
and
<Child name="{fatherName}" />
<p>How are you</p>
```

## Styling

```html
<!-- Component.svelte -->
<h1>Hello, world.</h1>
<p class="greeting">How are you?</p>

<style>
    h1 {
        color: purple;
    }
    .greeting {
        color: darkblue;
    }
</style>
```

## Typescript and SCSS

```html
<!-- Component.svelte -->
<script context="module" lang="ts">
    let contextCounter: number = 100;
</script>

<script lang="ts">
    let count: number = 0;
</script>

<div class="count-container">
    <h3 class="count">{count}</h3>
    <button on:click={() => count++} class="count-btn">+ Add</button>
</div>

<style lang="scss">
    .count-container {
        .count {
            color: green;
        }
        .count-btn {
            color: green;

            &:active {
                color: darkgreen;
            }
        }
    }
</style>
```

## Context Module

Svelte Components have module context. Which can be used to share same logic and variable values between multiple instances of the same component.

```html
<script context="module">
    let totalComponents = 0;

    // this allows an importer to do e.g.
    // `import Example, { alertTotal } from './Example.svelte'`
    export function alertTotal() {
        alert(totalComponents);
    }
</script>

<script>
    totalComponents += 1;
    console.log(`total number of times this component has been created: ${totalComponents}`);
</script>
```

## Initializing

Svelte can be initialized using following code :

```javascript
import App from "./App.svelte";
const app = new App({
    target: document.body,
    // Passing props to <App> component
    props: {
        answer: 42,
    },
});
```
