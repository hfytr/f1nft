<script>
    import { Section, Register } from 'flowbite-svelte-blocks';
    import { Button, Checkbox, Label, Input } from 'flowbite-svelte';
    import { signup, setCurrUser } from '$lib/api';
    import { Modal } from 'flowbite-svelte';

    let defaultModal = false;
</script>

<Modal title="Terms of Service" bind:open={defaultModal} autoclose>
    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">Successfully signed in!</p>
    <svelte:fragment slot="footer">
      <Button color="purple"><a href="/">Purchase your F1 NFT Now!</a></Button>
    </svelte:fragment>
</Modal>
  
<Section name="login">
    <Register>
        <svelte:fragment slot="top">
            Signup NFT Drift
        </svelte:fragment>
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <form class="flex flex-col space-y-6" on:submit={async () => {
            const email = document.querySelector("#email").value;
            const password = document.querySelector("#password").value;
            const name = document.querySelector("#name").value;
            await signup(email, password, name, 50);
            defaultModal = true;
            setCurrUser(email);
        }}>
            <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Change Password</h3>
            <Label class="space-y-2">
                <span>Your email</span>
                <Input type="email" name="email" id="email" placeholder="name@company.com" required />
            </Label>
            <Label class="space-y-2">
                <span>Your Name</span>
                <Input type="text" name="name" id="name" placeholder="name" required />
            </Label>
            <Label class="space-y-2">
                <span>Your password</span>
                <Input type="password" name="password" id="password" placeholder="•••••" required />
            </Label>
            <div class="flex items-start">
            <Checkbox>Remember me</Checkbox>
            </div>
            <Button color="green" type="submit" class="w-full1">Sign Up</Button>
        </form>
        </div>
    </Register>
</Section>