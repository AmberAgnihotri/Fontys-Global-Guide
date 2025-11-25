import { useState } from 'react';

export default function ExpenseTracker() {
    const [expenses, setExpenses] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('housing');
    const [currency, setCurrency] = useState('EUR');

    const categories = ['housing', 'food', 'transport', 'study', 'entertainment', 'healthcare', 'other'];
    const currencies = ['EUR', 'USD', 'GBP', 'INR', 'CNY'];
    const addExpense = (e) => {
        e.preventDefault();
        if (description && amount) {
            const newExpense = {
                id: Date.now(),
                description,
                amount: parseFloat(amount),
                category,
                currency,
                date: new Date().toLocaleDateString()
            };
            setExpenses([...expenses, newExpense]);
            setDescription('');
            setAmount('');
        }
    };

    const deleteExpense = (id) => {
        setExpenses(expenses.filter(exp => exp.id !== id));
    };

    const totalByCategory = categories.reduce((acc, cat) => {
        acc[cat] = expenses
            .filter(exp => exp.category === cat)
            .reduce((sum, exp) => sum + exp.amount, 0);
        return acc;
    }, {});

    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
            <div style={{ backgroundColor: 'red', color: 'white', padding: '10px' }}>
                TEST - If you see this, the component is loading!
            </div>
            
            <h1>Expense Tracker for International Students</h1>
            
            <form onSubmit={addExpense} style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
                <h2>Add New Expense</h2>
                <div style={{ display: 'grid', gap: '10px', marginBottom: '15px' }}>
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ padding: '8px', fontSize: '16px' }}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        step="0.01"
                        style={{ padding: '8px', fontSize: '16px' }}
                        required
                    />
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={{ padding: '8px', fontSize: '16px' }}
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                        ))}
                    </select>
                    <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        style={{ padding: '8px', fontSize: '16px' }}
                    >
                        {currencies.map(curr => (
                            <option key={curr} value={curr}>{curr}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
                    Add Expense
                </button>
            </form>

            <div style={{ marginBottom: '30px' }}>
                <h2>Summary</h2>
                <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Total: €{totalExpenses.toFixed(2)}</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
                    {categories.map(cat => (
                        totalByCategory[cat] > 0 && (
                            <div key={cat} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
                                <strong>{cat.charAt(0).toUpperCase() + cat.slice(1)}:</strong> €{totalByCategory[cat].toFixed(2)}
                            </div>
                        )
                    ))}
                </div>
            </div>

            <div>
                <h2>Expense List</h2>
                {expenses.length === 0 ? (
                    <p>No expenses yet. Add your first expense above!</p>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f8f9fa' }}>
                                <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Date</th>
                                <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Description</th>
                                <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Category</th>
                                <th style={{ padding: '10px', textAlign: 'right', border: '1px solid #ddd' }}>Amount</th>
                                <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.map(expense => (
                                <tr key={expense.id}>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{expense.date}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{expense.description}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{expense.category}</td>
                                    <td style={{ padding: '10px', textAlign: 'right', border: '1px solid #ddd' }}>
                                        {expense.currency} {expense.amount.toFixed(2)}
                                    </td>
                                    <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd' }}>
                                        <button
                                            onClick={() => deleteExpense(expense.id)}
                                            style={{ padding: '5px 10px', cursor: 'pointer', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}