<script>
	import TodoList from '$lib/TodoList.svelte'

	let { data } = $props()
</script>

<section>
	<div class="outer">
		<div class="inner auto-fill">
			<TodoList title="My List"></TodoList>
			<TodoList title="Your List" items={data.items}></TodoList>
			<TodoList></TodoList>
		</div>
	</div>
</section>
