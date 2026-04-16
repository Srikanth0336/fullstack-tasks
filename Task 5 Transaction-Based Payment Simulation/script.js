const userSelect = document.getElementById('userSelect');
const merchantSelect = document.getElementById('merchantSelect');
const userBalanceLabel = document.getElementById('userBalance');
const merchantBalanceLabel = document.getElementById('merchantBalance');
const paymentForm = document.getElementById('paymentForm');
const statusMessage = document.getElementById('statusMessage');
const payBtn = document.getElementById('payBtn');
const btnText = payBtn.querySelector('.btn-text');
const loader = document.getElementById('loader');

// Management elements
const userForm = document.getElementById('userForm');
const merchantForm = document.getElementById('merchantForm');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

let usersData = [];
let merchantsData = [];

// Fetch initial data
async function fetchData() {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        
        usersData = data.users;
        merchantsData = data.merchants;
        
        renderDropdowns();
    } catch (err) {
        console.error('Error fetching data:', err);
    }
}

function renderDropdowns() {
    // Populate Users
    userSelect.innerHTML = '<option value="">Select User</option>' + 
        usersData.map(u => `<option value="${u.id}">${u.name}</option>`).join('');
    
    // Populate Merchants
    merchantSelect.innerHTML = '<option value="">Select Merchant</option>' + 
        merchantsData.map(m => `<option value="${m.id}">${m.name}</option>`).join('');
}

userSelect.addEventListener('change', () => {
    const user = usersData.find(u => u.id == userSelect.value);
    userBalanceLabel.textContent = user ? `Balance: $${parseFloat(user.balance).toFixed(2)}` : 'Balance: $0.00';
});

merchantSelect.addEventListener('change', () => {
    const merchant = merchantsData.find(m => m.id == merchantSelect.value);
    merchantBalanceLabel.textContent = merchant ? `Balance: $${parseFloat(merchant.balance).toFixed(2)}` : 'Balance: $0.00';
});

paymentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const userId = userSelect.value;
    const merchantId = merchantSelect.value;
    const amount = document.getElementById('amount').value;

    // UI Feedback
    setLoading(true);
    statusMessage.style.display = 'none';

    try {
        const response = await fetch('/api/pay', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, merchantId, amount })
        });

        const result = await response.json();

        if (response.ok) {
            showMessage(result.message, 'success');
            await fetchData(); // Refresh balances
            paymentForm.reset();
            userBalanceLabel.textContent = 'Balance: $0.00';
            merchantBalanceLabel.textContent = 'Balance: $0.00';
        } else {
            showMessage(result.message || 'Transaction failed', 'error');
        }
    } catch (err) {
        showMessage('Connection error', 'error');
    } finally {
        setLoading(false);
    }
});

function setLoading(isLoading) {
    if (isLoading) {
        payBtn.disabled = true;
        btnText.style.display = 'none';
        loader.style.display = 'block';
    } else {
        payBtn.disabled = false;
        btnText.style.display = 'block';
        loader.style.display = 'none';
    }
}

function showMessage(text, type) {
    statusMessage.textContent = text;
    statusMessage.className = `status-message ${type}`;
    statusMessage.style.display = 'block';
}

// Tab Switching
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        btn.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Create User
userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('newUserName').value;
    const balance = document.getElementById('newUserBalance').value;

    try {
        const res = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, balance })
        });
        const data = await res.json();
        if (res.ok) {
            showMessage(data.message, 'success');
            userForm.reset();
            fetchData();
        } else {
            showMessage(data.error || 'Failed to create user', 'error');
        }
    } catch (err) {
        showMessage('Error creating user', 'error');
    }
});

// Create Merchant
merchantForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('newMerchantName').value;
    const balance = document.getElementById('newMerchantBalance').value;

    try {
        const res = await fetch('/api/merchants', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, balance })
        });
        const data = await res.json();
        if (res.ok) {
            showMessage(data.message, 'success');
            merchantForm.reset();
            fetchData();
        } else {
            showMessage(data.error || 'Failed to create merchant', 'error');
        }
    } catch (err) {
        showMessage('Error creating merchant', 'error');
    }
});

// Initial Load
fetchData();
