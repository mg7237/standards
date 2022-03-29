# Svelte Component Lifecycle

Svelte Components have a lifecycle starting from when they `initialize`, `update` to `destroy`.
This cycle can be useful for us when we implement certain functionalities in the components. Like :

## Usecases

1. Calling API once when the Component is initialised.
1. Adding some event listener when the Component is initialised.
1. Removing the event listener when the Component is destroyed.
1. Updating variable whenever there is some DOM changes in the Component.
1. Subscribing to a [Store](/stores) at the start.
1. Unsubscribing the store at the end.
1. Running some logic when [SSR Component](/svelte-kit/ssr) is mounted on DOM.
1. And many more use cases...

These all usecases can be inplemented by using lifecycle function callbacks of Svelte Components.

## Lifecycle Functions

| Function Callback | Trigger                                                              |
| ----------------- | -------------------------------------------------------------------- |
| `onMount`         | Called **after** the component is **mounted / added** to the DOM     |
| `beforeUpdate`    | Called **before** the component is updated when **state is changed** |
| `afterUpdate`     | Called **after** the component is updated when **state is changed**  |
| `onDestroy`       | Called **before** the component is **unmounted / removed** from DOM  |

---

### onMount

`onMount(callback: () => void)`  
`onMount(callback: () => () => void)`  
The `onMount` callback runs as soon as the component is mounted to the DOM.

-   `onMount` callback can be an `async` function.
-   If `onMount` callback returns a function without using `async`, then the returned function is called when component is unmounted. Just like `onDestroy`.

### beforeUpdate

`beforeUpdate(callback: () => void)`
The `beforeUpdate` callback runs immediately before component is updated after any state change.

-   First time, `beforeUpdate` will run before `onMount`.

### afterUpdate

`afterUpdate(callback: () => void)`
The `afterUpdate` callback runs immediately after component is updated after any state change.

### onDestroy

`onDestroy(callback: () => void)`
The `onDestory` callback runs immediately before component is unmounted / removed from DOM.

?> `onDestroy` is the only lifecycle callback that runs inside a [SSR](/svelte-kit/ssr) component.

## Example Usage

```html
<script>
    import { onMount, beforeUpdate, afterUpdate, onDestroy } from "svelte";

    let interval1;
    let interval2;

    onMount(() => {
        // do something - after component is mounted...
        console.log("Component has mounted");

        interval1 = setInterval(() => {
            /* do something */
        }, 1000);

        interval2 = setInterval(() => {
            /* do something */
        }, 5000);

        return () => {
            // do something - before component is destoryed
            // alternative to "onDestory()"
            clearInterval(interval1);
        };
    });

    beforeUpdate(() => {
        // do something - before component is updated...
        console.log("Component is about to update");
    });

    afterUpdate(() => {
        // do something - after component is updated...
        console.log("Component has updated");
    });

    onDestory(() => {
        // do something - before component is unmounted / destroyed...
        console.log("Component will destroy");
        clearInterval(interval2);
    });
</script>
```
