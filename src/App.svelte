<script>
    import { onMount } from "svelte";

    let promise = Promise.resolve([]);
    async function fetchPlanets() {
        const response = await self.fetch('https://www.swapi.tech/api/planets');

        if (response.ok) {
            return response.json();
        } else {
            throw new Error(planets);
        }
    }
    onMount(() => {
        promise = fetchPlanets();
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


