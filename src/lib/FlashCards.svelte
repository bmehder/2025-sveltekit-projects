<script lang="ts">
	let { teachers } = $props()

	let index: number = $state()

	function onclick() {
		index = Math.floor(Math.random() * teachers.length)
	}

	onclick()
</script>

{#key index}
	<div class="flow">
		<h2>New MFS Teachers Flash Cards</h2>
		<button {onclick}>New Teacher</button>
		<details class="flow">
			<summary>
				<h3>{teachers[index].name}</h3>
			</summary>

			<ul>
				{#each teachers[index].classes as course}
					<li>{course}</li>
				{/each}
			</ul>
		</details>
	</div>
{/key}

<style>
	div {
		display: grid;
		width: min(24rem, 100%);
		margin-inline: auto;
	}

	h2 {
		text-align: center;
	}

	h3 {
		display: inline;
		padding-inline-start: 0.5rem;
	}

	ul {
		padding-inline-start: 2.5rem;
	}

	button {
		padding-block: 0.5rem;
		padding-inline: 1rem;
	}
</style>
