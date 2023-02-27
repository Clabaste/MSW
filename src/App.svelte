<script>
    import { onMount } from "svelte";

    let userField, isDirty = false

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
    const postUsername = async () => {
        const response = await fetch('login', {
            method: 'POST',
            body: JSON.stringify({userName: userField})
        })
        if (response.ok) {
            sessionStorage.setItem("is-authenticated", true);
            return response.json();
        } else {
            return response.json().then(text => {
                throw new Error(text.errorMessage)
            })
        }
    }

    const handleSetUser = () => {
        isDirty=true
        promise = postUsername()
    }
</script>

<main>
    {#await promise}
        <p>...waiting</p>
    {:then user}
        <h1 title={user.username}>Willkommen, liebe {user.username}</h1>
    {:catch error}
        <input bind:value={userField} type="text">
        <button on:click|preventDefault={handleSetUser}>Send</button>
        {#if isDirty}
            <p style="color: red">{error.message}</p>
        {/if}

    {/await}
</main>


<style>
    h1 {
        max-width: 700px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>