<script>
    import { A, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Modal, Button } from 'flowbite-svelte';
    import { drivers } from "$lib/api"

    let popupModal = false;
    let currName = "";
    let currPoints = -1
    let currPrice = -1
</script>

<style>
    .tablewrapper {
        margin: 3rem;
    }
</style>

<center><h1>Choose Your Driver</h1></center>

<Modal bind:open={popupModal} size="xs" autoclose>
    <div class="text-center">
      <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to select <b>{currName}</b> for <b>{currPrice}</b>?</h3>
      <Button color="alternative">No, select a different driver</Button>
      <Button color="green" class="me-2">Yes, I'm sure</Button>
    </div>
  </Modal>

<div class="tablewrapper">
<Table hoverable={true}>
    <TableHead>
    <TableHeadCell>Name</TableHeadCell>
    <TableHeadCell>Points</TableHeadCell>
    <TableHeadCell>Price</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">

        {#each drivers as d}
            <TableBodyRow on:click={() => {
                    popupModal = true
                    currName = d.name;
                    currPoints = d.points;
                    currPrice = d.price;
                }}>
                <TableBodyCell><b>{d.name}</b></TableBodyCell>
                <TableBodyCell>{d.points}</TableBodyCell>
                <TableBodyCell>${d.price}</TableBodyCell>
            </TableBodyRow>
        {/each}

    </TableBody>
</Table>
</div>