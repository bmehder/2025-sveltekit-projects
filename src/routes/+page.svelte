<script lang="ts">
	import Eyes from '$lib/Eyes.svelte'
	import FlashCards from '$lib/FlashCards.svelte'
	import items from '$lib/todoItems.js'
	import TodoList from '$lib/TodoList.svelte'
	import Typewriter from '$lib/Typewriter.svelte'
</script>

<!-- <section>
  <div class="outer">
    <div class="inner auto-fill">
      <TodoList title="My List"></TodoList>
      <TodoList title="Your List" {items}></TodoList>
      <TodoList></TodoList>
    </div>
  </div>
</section> -->

<!-- <section>
  <div class="outer">
    <div class="inner">
      <Typewriter message="Hello, World!" speed="200"></Typewriter>
      <Typewriter></Typewriter>
    </div>
  </div>
</section> -->

<!-- <section>
  <div class="outer">
    <div class="inner">
      <Eyes></Eyes>
    </div>
  </div>
</section> -->

<section>
	<div class="outer">
		<div class="inner">
			<FlashCards></FlashCards>
		</div>
	</div>
</section>
