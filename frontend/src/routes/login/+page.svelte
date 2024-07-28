<script>
    import { Section, Register } from 'flowbite-svelte-blocks';
    import { Button, Checkbox, Label, Input, Modal } from 'flowbite-svelte';
    import { login, setCurrUser } from '$lib/api';

    let defaultModal = false;
</script>

<Modal title="Terms of Service" bind:open={defaultModal} autoclose>
    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">Successfully logged in!</p>
    <svelte:fragment slot="footer">
      <Button color="purple"><a href="/">Go to your home page!</a></Button>
    </svelte:fragment>
</Modal>
  
<Section name="login">
    <Register href="/">
        <svelte:fragment slot="top">
            NFT Drift
        </svelte:fragment>
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <form class="flex flex-col space-y-6" on:submit={async() => {
            const email = document.querySelector("#email").value;
            const password = document.querySelector("#pass").value;
            console.log(await login(email, password));
            setCurrUser(email);
            defaultModal = true;
        }}>
            <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Change Password</h3>
            <Label class="space-y-2">
            <span>Your email</span>
            <Input type="email" name="email" id="email" placeholder="name@company.com" required />
            </Label>
            <Label class="space-y-2">
            <span>Your password</span>
            <Input type="password" name="password" id="pass" placeholder="•••••" required />
            </Label>
            <div class="flex items-start">
            <Checkbox>Remember me</Checkbox>
            <a href="/" class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Forgot password?</a>
            </div>
            <Button color="purple" type="submit" class="w-full1">Sign in</Button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet? <a href="/signup" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
            </p>
        </form>
        </div>
    </Register>
</Section>