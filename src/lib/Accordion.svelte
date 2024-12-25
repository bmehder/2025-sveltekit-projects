<script>
	let { items, name = null } = $props()
</script>

{#each items as item}
	<details {name}>
		<summary>
			<h3>
				{item.question}
			</h3>
		</summary>
		<div class="content">
			{item.answer}
		</div>
	</details>
{/each}

<style>
	details {
		background-color: gray;
		border-bottom: 1px solid;
	}
</style>
