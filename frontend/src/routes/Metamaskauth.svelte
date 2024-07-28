<script>
    window.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginButton');
    const status = document.getElementById('status');

    // Check if MetaMask is installed
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
});

</script>

<style>
    body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
}

.container {
    text-align: center;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #fff;
}

#loginButton {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    background-color: #f6851b;
    color: #fff;
    border: none;
    border-radius: 5px;
}

#loginButton:hover {
    background-color: #e2761b;
}

#status {
    margin-top: 20px;
    font-size: 14px;
    color: #333;
}
/* 
.nft {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
}

.nft.owned {
    background-color: #d4edda;
}

.nft .buyButton {
    padding: 5px 10px;
    font-size: 14px;
    cursor: pointer;
    background-color: #f6851b;
    color: #fff;
    border: none;
    border-radius: 5px;
}

.nft .buyButton:hover {
    background-color: #e2761b;
} */
</style>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login with MetaMask</title>
    <!-- <link rel="stylesheet" href="style.css"> -->
</head>
<body>
    <div class="container">
        <h1>Auth with MetaMask</h1>
        <button id="loginButton">Auth with MetaMask</button>
        <p id="status"></p>
        <div id="nftList"></div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/web3@1.3.4/dist/web3.min.js"></script>
    <!-- <script src="script.js"></script> -->
</body>
