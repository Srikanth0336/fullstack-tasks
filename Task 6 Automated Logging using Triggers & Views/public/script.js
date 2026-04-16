const employeeForm = document.getElementById('employeeForm');
const logList = document.getElementById('logList');
const reportList = document.getElementById('reportList');

async function fetchData() {
    try {
        const logsRes = await fetch('/api/logs');
        const logs = await logsRes.json();
        
        const reportsRes = await fetch('/api/report');
        const reports = await reportsRes.json();

        renderLogs(logs);
        renderReports(reports);
    } catch (err) {
        console.error('Fetch error:', err);
    }
}

function renderLogs(logs) {
    if (logs.length === 0) return;
    logList.innerHTML = logs.map(log => `
        <div class="card ${log.action_type}">
            <div class="card-header">
                <span>${log.action_type}</span>
                <span>${new Date(log.changed_at).toLocaleString()}</span>
            </div>
            <div class="card-body">${log.details}</div>
        </div>
    `).join('');
}

function renderReports(reports) {
    if (reports.length === 0) return;
    reportList.innerHTML = reports.map(report => `
        <div class="card">
            <div class="card-header">
                <span>Date: ${new Date(report.report_date).toLocaleDateString()}</span>
                <span>Actions: ${report.total_actions}</span>
            </div>
            <div class="card-body">
                <strong>Summary:</strong> ${report.summary_details}
            </div>
        </div>
    `).join('');
}

employeeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        name: document.getElementById('name').value,
        position: document.getElementById('position').value,
        salary: document.getElementById('salary').value
    };

    try {
        const res = await fetch('/api/employees', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        if (res.ok) {
            employeeForm.reset();
            // Refresh data after a short delay for the trigger to finish
            setTimeout(fetchData, 500);
        }
    } catch (err) {
        console.error('Submission error:', err);
    }
});

// Initial load
fetchData();
// Poll for updates every 5 seconds
setInterval(fetchData, 5000);
