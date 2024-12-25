<script lang="ts">
	import Accordion from '$lib/Accordion.svelte'
	import Eyes from '$lib/Eyes.svelte'
	import items from '$lib/todoItems.js'
	import TodoList from '$lib/TodoList.svelte'
	import Typewriter from '$lib/Typewriter.svelte'

	let { data } = $props()
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
		<div class="inner" style="max-width: 32rem;">
			<Accordion items={data.faqs} name="faqs"></Accordion>
		</div>
	</div>
</section>
