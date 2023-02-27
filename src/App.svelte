<script>
    import { onMount } from "svelte";

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
</script>

<main>
    {#await promise}
        <p>...waiting</p>
    {:then planets}
        <pre>{JSON.stringify(planets, null, 2)}</pre>
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}
</main>


