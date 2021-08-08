<script>
    import Kanban from "./KanbanBoard.svelte";
</script>

<style>
	.container {
		display: grid;
		grid-auto-flow: row;
		gap: 1m;
	}
	@media(min-width: 45em){
		.container {
			grid-auto-flow: column;
		}
	}
</style>

<div class="container">
	<Kanban kanbanName="Arthur's kanban"/>
	<Kanban kanbanName="Arthur's kanban"/>
	<Kanban kanbanName="Arthur's kanban"/>
</div>
