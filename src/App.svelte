<script>
    import { onMount } from "svelte";

    let userName, isDirty = false

    let promise = Promise.resolve([]);
    async function fetchUser() {
        const response = await self.fetch('user');

        if (response.ok) {
            return response.json();
        } else {
            return response.json().then(text => {
                throw new Error(text.errorMessage)
            })
        }
    }
    onMount(() => {
        promise = fetchUser();
    })
    const setUser = () => {
        isDirty = true
        if(userName === 'admin') {
            sessionStorage.setItem("is-authenticated", true);
            promise = fetchUser();
        }
    }
</script>

<main>
    {#await promise}
        <p>...waiting</p>
    {:then planets}
        <pre>{JSON.stringify(planets, null, 2)}</pre>
    {:catch error}
        <input bind:value={userName} type="text">
        <button on:click={setUser}>Send</button>
        {#if isDirty}
            <p style="color: red">{error.message}</p>
        {/if}

    {/await}
</main>


