<script>
	import TodoList from '$lib/TodoList.svelte'

	const todoItems = [
		{ name: 'Buy Groceries', isDone: false, id: crypto.randomUUID() },
		{ name: 'Do Laundry', isDone: true, id: crypto.randomUUID() },
		{ name: 'Learn JS', isDone: false, id: crypto.randomUUID() },
	]
</script>

<section>
	<div class="outer">
		<div class="inner auto-fill">
			<TodoList title="My List"></TodoList>
			<TodoList title="Your List" items={todoItems}></TodoList>
			<!-- <TodoList></TodoList> -->
		</div>
	</div>
</section>
