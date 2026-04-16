// Order Management System Logic
// Fetching data from MySQL via Express API

async function fetchData() {
    try {
        // 1. Fetch Order History (JOIN Analysis)
        const orderRes = await fetch('/api/orders');
        const orderHistory = await orderRes.json();
        
        // 2. Fetch Stats (Subquery Analysis)
        const statRes = await fetch('/api/stats');
        const stats = await statRes.json();

        updateDashboard(orderHistory, stats);
    } catch (error) {
        console.error('Error fetching data:', error);
        // Fallback to empty state or show error in UI
    }
}

function updateDashboard(orderHistory, stats) {
    const tableBody = document.getElementById('orders-table-body');
    
    // 1. Render Table (JOIN Results)
    tableBody.innerHTML = '';
    orderHistory.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>#${order.order_id}</td>
            <td style="font-weight: 600;">${order.customerName}</td>
            <td>${order.productName}</td>
            <td><span class="category-tag">${order.category}</span></td>
            <td>${new Date(order.order_date).toLocaleDateString()}</td>
            <td><strong>$${parseFloat(order.total_amount).toFixed(2)}</strong></td>
            <td><span class="status-badge completed">Completed</span></td>
        `;
        tableBody.appendChild(row);
    });

    // 2. Update Stats (Subquery Results)
    const totalRevenue = orderHistory.reduce((sum, o) => sum + parseFloat(o.total_amount), 0);
    document.getElementById('stat-revenue').innerText = `$${totalRevenue.toLocaleString()}`;
    document.getElementById('stat-orders').innerText = orderHistory.length;

    if (stats.highestOrder) {
        document.getElementById('stat-highest').innerText = `$${parseFloat(stats.highestOrder.total_amount).toFixed(2)}`;
        document.getElementById('highest-order-customer').innerText = `By ${stats.highestOrder.customerName}`;
    }

    if (stats.activeCustomer) {
        document.getElementById('stat-active-customer').innerText = stats.activeCustomer.name;
        document.getElementById('active-customer-orders').innerText = `${stats.activeCustomer.orderCount} orders placed`;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    setupEventListeners();
});

async function fetchData() {
    try {
        const [orderRes, statRes] = await Promise.all([
            fetch('/api/orders'),
            fetch('/api/stats')
        ]);
        
        const orderHistory = await orderRes.json();
        const stats = await statRes.json();

        updateDashboard(orderHistory, stats);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function setupEventListeners() {
    const modal = document.getElementById('order-modal');
    const openBtn = document.getElementById('open-modal-btn');
    const closeBtn = document.querySelector('.close-btn');
    const form = document.getElementById('add-order-form');

    openBtn.addEventListener('click', async () => {
        modal.classList.add('active');
        await populateDropdowns();
    });

    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = {
            customer_id: document.getElementById('customer-select').value,
            product_id: document.getElementById('product-select').value,
            quantity: document.getElementById('order-quantity').value,
            order_date: document.getElementById('order-date').value
        };

        const res = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (res.ok) {
            modal.classList.remove('active');
            form.reset();
            fetchData(); // Refresh list and stats
        }
    });

    // Side navigation interaction
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });
}

async function populateDropdowns() {
    const custSelect = document.getElementById('customer-select');
    const prodSelect = document.getElementById('product-select');

    const [custRes, prodRes] = await Promise.all([
        fetch('/api/customers'),
        fetch('/api/products')
    ]);

    const customers = await custRes.json();
    const products = await prodRes.json();

    custSelect.innerHTML = '<option value="">Select Customer</option>' + 
        customers.map(c => `<option value="${c.customer_id}">${c.name}</option>`).join('');
    
    prodSelect.innerHTML = '<option value="">Select Product</option>' + 
        products.map(p => `<option value="${p.product_id}">${p.name} ($${p.price})</option>`).join('');
}

