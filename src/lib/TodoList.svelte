<script lang="ts">
  // Import the slide transition
  import { slide } from "svelte/transition";

  type Todo = {
    name: string;
    isDone: boolean;
    id: string;
  };

  // Component Props
  let { title = "Todo List", items = [] }: { title: string; items: Todo[] } =
    $props();

  // Explicit State
  const list = $state(items);

  // Implicit State (Derived State)
  let todosCount = $derived(list.length);
  let completedTodosCount = $derived(list.filter((todo) => todo.isDone).length);

  // State update functions (mutate the state)
  const addTodo = (newTodo: string) => {
    const newItem: Todo = {
      name: newTodo,
      isDone: false,
      id: crypto.randomUUID(),
    };
    list.push(newItem);
  };

  const updateTodo = (index: number) => {
    list[index].isDone = !list[index].isDone;
  };

  const deleteTodo = (index: number) => {
    list.splice(index, 1);
  };

  // Event handlers (callback functions)
  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const newTodo = formData.get("todo-list").toString().trim();
    if (newTodo !== "") {
      addTodo(newTodo);
    }
    form.reset();
  }

  function handleUpdate(index: number) {
    updateTodo(index);
  }

  function handleDelete(index: number) {
    if (confirm("Are you sure you want to delete this todo?")) {
      deleteTodo(index);
    }
  }
</script>

<div class="todo-list">
  <div class="title">{title}</div>

  <form method="POST" onsubmit={handleSubmit}>
    <input type="text" name="todo-list" placeholder="Enter new todo..." />
    <button>+</button>
  </form>

  <ul>
    {#each list as item, index (item.id)}
      <li transition:slide>
        <button
          class:line-through={item.isDone}
          onclick={() => handleUpdate(index)}>{item.name}</button
        >
        <button onclick={() => handleDelete(index)}>X</button>
      </li>
    {:else}
      <p>Enter new todo</p>
    {/each}
  </ul>

  {#if todosCount !== 0}
    <p>{completedTodosCount} of {todosCount} todos completed</p>
  {/if}
</div>

<style>
  .todo-list {
    display: grid;
    gap: 1.5rem;
    align-content: start;
    font-size: 1.25rem;
    text-align: center;
  }

  .title {
    font-size: 2rem;
    font-weight: bold;
  }

  form {
    display: flex;
  }

  input {
    width: 100%;
  }

  input,
  button {
    padding: 1rem;
    font: inherit;
  }

  ul {
    list-style: none;
  }

  ul button {
    padding-block: 0;
    background: none;
    border: none;
  }

  ul button:hover {
    opacity: 0.7;
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    line-height: 2;
  }

  .line-through {
    text-decoration: line-through;
  }
</style>
