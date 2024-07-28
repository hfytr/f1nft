export function metaMaskAuth() {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');

        loginButton.addEventListener('click', async () => {
            try {
                // Request account access
                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                const account = accounts[0];
                console.log('Connected account:', account);
                status.textContent = `Connected account: ${account}`;
            } catch (error) {
                console.error('User denied account access or error occurred:', error);
                status.textContent = 'Failed to connect. Please try again.';
            }
        });
    } else {
        console.log('MetaMask is not installed.');
        status.textContent = 'MetaMask is not installed. Please install MetaMask and try again.';
        loginButton.disabled = true;
    }
}