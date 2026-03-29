// State Management
let expenses = [];
let income = 3000.00;
let myChart;

// DOM Elements
const expenseForm = document.getElementById('expense-form');
const transactionList = document.getElementById('transaction-list');
const grandTotalDisplay = document.getElementById('grand-total');
const monthTotalDisplay = document.getElementById('month-total');
const remainingDisplay = document.getElementById('remaining');

// 1. Handle Form Submission
expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const desc = document.getElementById('desc').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;

    const newExpense = { id: Date.now(), desc, amount, category };
    expenses.push(newExpense);

    updateUI();
    expenseForm.reset();
});

// 2. Update the Dashboard
function updateUI() {
    // Clear list
    transactionList.innerHTML = '';

    let totalSpent = 0;
    const categoryTotals = {
        'Food & Dining': 0,
        'Housing': 0,
        'Transportation': 0,
        'Entertainment': 0
    };

    // Process expenses
    expenses.forEach(exp => {
        totalSpent += exp.amount;
        categoryTotals[exp.category] += exp.amount;

        // Add to list
        const li = document.createElement('li');
        li.style.padding = "8px 0";
        li.style.borderBottom = "1px solid #eee";
        li.style.fontSize = "0.9rem";
        li.innerHTML = `<strong>${exp.desc}</strong> <span style="float:right">-$${exp.amount.toFixed(2)}</span>`;
        transactionList.appendChild(li);
    });

    // Update Totals
    grandTotalDisplay.innerText = `$${totalSpent.toFixed(2)}`;
    monthTotalDisplay.innerText = `$${totalSpent.toFixed(2)}`;
    remainingDisplay.innerText = `$${(income - totalSpent).toFixed(2)}`;

    updateChart(categoryTotals);
}

// 3. Initialize & Update Chart.js
function updateChart(dataValues) {
    const ctx = document.getElementById('expenseChart').getContext('2d');

    if (myChart) {
        myChart.destroy(); // Destroy old chart before creating new one
    }

    myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(dataValues),
            datasets: [{
                data: Object.values(dataValues),
                backgroundColor: ['#134e4a', '#2dd4bf', '#5eead4', '#ccfbf1'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // This allows it to follow the CSS height
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { boxWidth: 12, padding: 20 }
                }
            },
            layout: {
                padding: 20
            }
        }
    });
}

// Initialize with empty data
updateUI();