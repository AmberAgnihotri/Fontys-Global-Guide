import { useState, useEffect } from 'react';

// Inline SVG icons as data URLs
const housingIcon = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwIDAgMjggMjgiPjxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0xNS40MDggMy40OThhMi4yNSAyLjI1IDAgMCAwLTIuODE2IDBsLTcuNzUgNi4yMTdBMi4yNSAyLjI1IDAgMCAwIDQgMTEuNDd2MTEuMjhBMi4yNSAyLjI1IDAgMCAwIDYuMjUgMjVoMi41QTIuMjUgMi4yNSAwIDAgMCAxMSAyMi43NXYtNS41YzAtLjY5LjU2LTEuMjUgMS4yNS0xLjI1aDMuNWMuNjkgMCAxLjI1LjU2IDEuMjUgMS4yNXY1LjVBMi4yNSAyLjI1IDAgMCAwIDE5LjI1IDI1aDIuNUEyLjI1IDIuMjUgMCAwIDAgMjQgMjIuNzVWMTEuNDdhMi4yNSAyLjI1IDAgMCAwLS44NDItMS43NTVsLTcuNzUtNi4yMTdaIi8+PC9zdmc+';
const foodIcon = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwIDAgMjggMjgiPjxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik01LjQ5MiAyLjc5YS44ODEuODgxIDAgMCAxIDEuNzU4LjA5MnY1Ljg2N2EuNzUuNzUgMCAxIDAgMS41IDBWMi43NWEuNzUuNzUgMCAwIDEgMS41IDB2NS45OTlhLjc1Ljc1IDAgMCAwIDEuNSAwVjIuODgyYS44ODIuODgyIDAgMCAxIDEuNzU4LS4wOTJjLjA3Ni43MjIuNDkyIDQuNzg1LjQ5MiA2LjcxYzAgMS4zMzgtLjU4NSAyLjU0LTEuNTEgMy4zNjRjLS4zMzQuMjk2LS40OS42MDEtLjQ5Ljg1N3YuNzI3bC4wMDEuMDQ3Yy4wNDIuNTk5LjQ5OSA3LjI4Ny40OTkgOC41MDVhMyAzIDAgMSAxLTYgMGMwLTEuMjE4LjQ1OC03LjkwNi40OTktOC41MDVMNSAxNC40NDh2LS43MjdjMC0uMjU1LS4xNTYtLjU2LS40OS0uODU3QTQuNSA0LjUgMCAwIDEgNSA5LjVjMC0xLjkyNS40MTYtNS45ODguNDkyLTYuNzFNMTguOTU1IDE0bC0uMDMyLjU1NmMtLjA0Ny44MTctLjExIDEuOTItLjE3MiAzLjA2MmMtLjEyNCAyLjI2Ny0uMjUxIDQuNzM0LS4yNTEgNS4zODJhMyAzIDAgMSAwIDYgMGMwLS43MjEtLjE1OC0zLjQ3NC0uMjk0LTUuODU1bC0uMDA0LS4wNjZDMjQuMDkzIDE1LjE4IDI0IDEzLjU1IDI0IDEzLjI1VjIuNzVhLjc1Ljc1IDAgMCAwLS43NS0uNzVoLS41QTYuNzUgNi43NSAwIDAgMCAxNiA4Ljc1djMuNWMwIC45NjYuNzg0IDEuNzUgMS43NSAxLjc1eiIvPjwvc3ZnPg==';
const transportIcon = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0xMC43NSA1YS43NS43NSAwIDAgMCAwIDEuNWgyLjVhLjc1Ljc1IDAgMCAwIDAtMS41aC0yLjVaTTQgNS43NUEzLjc1IDMuNzUgMCAwIDEgNy43NSAyaDguNUEzLjc1IDMuNzUgMCAwIDEgMjAgNS43NVY5LjVoMS4yMjdhLjc1Ljc1IDAgMCAxIDAgMS41SDIwdjguNzVhMS43NSAxLjc1IDAgMCAxLTEuNzUgMS43NWgtMS41QTEuNzUgMS43NSAwIDAgMSAxNSAxOS43NVYxOC41SDl2MS4yNWExLjc1IDEuNzUgMCAwIDEtMS43NSAxLjc1aC0xLjVBMS43NSAxLjc1IDAgMCAxIDQgMTkuNzVWMTFIMi43NWEuNzUuNzUgMCAwIDEgMC0xLjVINFY1Ljc1Wk0xNi41IDE4LjV2MS4yNWMwIC4xMzguMTEyLjI1LjI1LjI1aDEuNWEuMjUuMjUgMCAwIDAgLjI1LS4yNVYxOC41aC0yWm0tMTEgMHYxLjI1YzAgLjEzOC4xMTIuMjUuMjUuMjVoMS41YS4yNS4yNSAwIDAgMCAuMjUtLjI1VjE4LjVoLTJabTIuMjUtMTVBMi4yNSAyLjI1IDAgMCAwIDUuNSA1Ljc1VjEyaDEzVjUuNzVhMi4yNSAyLjI1IDAgMCAwLTIuMjUtMi4yNWgtOC41Wk05IDE1YTEgMSAwIDEgMC0yIDAgMSAxIDAgMCAwIDIgMFptNyAxYTEgMSAwIDEgMCAwLTIgMSAxIDAgMCAwIDAgMloiLz48L3N2Zz4=';
const studyIcon = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwIDAgMjggMjgiPjxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik04Ljc1IDJBMS43NSAxLjc1IDAgMCAwIDUgNS43NXYxNi41QTMuNzUgMy43NSAwIDAgMCA4Ljc1IDI2aDEzLjVhLjc1Ljc1IDAgMCAwIDAtMS41SDguNzVhMi4yNSAyLjI1IDAgMCAxLTIuMjM2LTJIMjEuNUExLjUgMS41IDAgMCAwIDIzIDIxVjUuNzVBMy43NSAzLjc1IDAgMCAwIDE5LjI1IDJ6TTguNSA2Ljc1YzAtLjY5LjU2LTEuMjUgMS4yNS0xLjI1aDguNWMuNjkgMCAxLjI1LjU2IDEuMjUgMS4yNXYxLjVjMCAuNjktLjU2IDEuMjUtMS4yNSAxLjI1aC04LjVjLS42OSAwLTEuMjUtLjU2LTEuMjUtMS4yNXoiLz48L3N2Zz4=';
const entertainmentIcon = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Im0xOS43MjkgMy44NzVsLjA1LjE2bC41NTIgMS45MjJhLjc1Ljc1IDAgMCAxLS40MTguODkzbC0uMDk2LjAzNUw5LjA5IDkuOTZoMTEuMTZhLjc1Ljc1IDAgMCAxIC43NDIuNjVsLjAwNy4xdjguNDk5YTIuNzUgMi43NSAwIDAgMS0yLjU4MiAyLjc0NWwtLjE2OC4wMDVINS43NWEyLjc1IDIuNzUgMCAwIDEtMi43NDUtMi41ODJMMy4wMDE5LjIwOXYtOC4zOTJsLS41MjItMS44MjFhMi43NSAyLjc1IDAgMCAxIDEuNzI2LTMuMzVsLjE2LS4wNTJMMTYuMzc4IDIuMTVhMi43NSAyLjc1IDAgMCAxIDMuMzUgMS43MjZaTTYuMjczIDYuNjA3bC0xLjQ5Ni40M2ExLjI1IDEuMjUgMCAwIDAtLjg4NiAxLjQybC4wMy4xMjVsLjM0NCAxLjIwMWwuMjk1LS4wODVsMS43MTMtMy4wOVptNC43NTYtMS4zNjNsLTIuNzE3Ljc3OWwtMS43MTQgMy4wOWwyLjcxOC0uNzc4bDEuNzEzLTMuMDkxWm00Ljc1OC0xLjM2NWwtMi43MTguNzhsLTEuNzEzIDMuMDlsMi43MTYtLjc3OGwxLjcxNS0zLjA5MlptMS44NDctLjIzM2wtMS41MjEgMi43NGwyLjU2OS0uNzM3bC0uMzQ0LTEuMmExLjI0OCAxLjI0OCAwIDAgMC0uNzA0LS44MDNaIi8+PC9zdmc+';
const healthcareIcon = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwIDAgMjggMjgiPjxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0xNS43OCAzLjc0NGMyLjM0LTIuMzM3IDYuMTM3LTIuMzI4IDguNDc1LjAxYzIuMzQgMi4zNCAyLjM0NiA2LjE0Mi4wMDQgOC40ODFsLTEyLjAzOCAxMi4wMmMtMi4zNCAyLjMzNy02LjEzNyAyLjMyOC04LjQ3NS0uMDFjLTIuMzQtMi4zNC0yLjM0Ni02LjE0Mi0uMDA0LTguNDhMMTUuNzggMy43NDNabTEuOTMzIDEyLjkwOGw1LjQ4Ni01LjQ3OGE0LjQ5OCA0LjQ5OCAwIDAgMC0uMDA1LTYuMzZhNC40OTggNC40OTggMCAwIDAtNi4zNTQtLjAwOWwtNS40OSA1LjQ4M2w2LjM2MyA2LjM2NFptLTUuOTMyIDQuNjI4YS43NS43NSAwIDAgMC0xLjA2LTEuMDZsLTEuOTc4IDEuOTc3YTEuMDUgMS4wNSAwIDAgMS0xLjQ4NCAwbC0uNDc4LS40NzdhLjc1Ljc1IDAgMCAwLTEuMDYgMS4wNmwuNDc3LjQ3N2EyLjU1IDIuNTUgMCAwIDAgMy42MDYgMGwxLjk3Ny0xLjk3N1oiLz48L3N2Zz4=';
const otherIcon = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwIDAgMTAyNCAxMDIzIj48cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJtODk2IDgwMGwxMjggMjIzbC0yMjQtMTI4bC0xLTZsLTE2OC0xNjdsLTE1MiAxNTFxLTQyIDQyLTk1LTEwVjY4NEwxMjYgNDE2bC0xMyAxMnEtMTkgMjAtNDYuNSAyMHQtNDctMTkuNXQtMTkuNS00N1QxOSAzMzRMMzM1IDE5cTIwLTE5IDQ3LjUtMTl0NDcgMTlUNDQ5IDY1LjVUNDI5IDExM2wtMTMgMTNsMjY5IDI1OGwxNzkgMXE1MiA1MiA5IDk0TDcyMiA2MzBsMTY4IDE2OHoiLz48L3N2Zz4=';

const mobileStyles = `
  @media (max-width: 768px) {
    table {
      font-size: 12px !important;
    }
    th, td {
      padding: 6px !important;
    }
    button {
      padding: 4px 8px !important;
      font-size: 12px !important;
    }
    h1 {
      font-size: 24px !important;
    }
    h2 {
      font-size: 16px !important;
    }
    p {
      font-size: 14px !important;
    }
  }
`;

export default function ExpenseTracker() {
    const [activeTab, setActiveTab] = useState('tracker');

    // Expense Tracker State
    const [expenses, setExpenses] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('housing');
    const [currency, setCurrency] = useState('EUR');

    // Currency Converter State
    const [fromCurrency, setFromCurrency] = useState('EUR');
    const [toCurrency, setToCurrency] = useState('USD');
    const [convertAmount, setConvertAmount] = useState('1');
    const [convertedAmount, setConvertedAmount] = useState('');
    const [exchangeRate, setExchangeRate] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [convertLoading, setConvertLoading] = useState(false);
    const [convertError, setConvertError] = useState(null);

    // Extended currency list for converter
    const allCurrencies = ['EUR', 'USD', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR', 'MXN', 'SGD', 'HKD', 'NOK', 'SEK', 'DKK', 'NZD', 'ZAR', 'BRL', 'RUB', 'TRY', 'KRW', 'THB'];

    // Fetch exchange rates for currency converter
    const fetchExchangeRate = async () => {
        setConvertLoading(true);
        setConvertError(null);

        try {
            const response = await fetch(
                `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
            );

            if (!response.ok) {
                throw new Error(`Failed to fetch rates for ${fromCurrency}`);
            }

            const data = await response.json();

            if (!data.rates || !data.rates[toCurrency]) {
                throw new Error(`Currency ${toCurrency} not available`);
            }

            const rate = data.rates[toCurrency];
            setExchangeRate(rate);
            setLastUpdated(new Date());

            if (convertAmount) {
                const converted = (parseFloat(convertAmount) * rate).toFixed(2);
                setConvertedAmount(converted);
            }
        } catch (err) {
            setConvertError(err.message);
            setExchangeRate(null);
            setConvertedAmount('');
        } finally {
            setConvertLoading(false);
        }
    };

    // Auto-fetch rates when currencies change
    useEffect(() => {
        if (activeTab === 'converter') {
            fetchExchangeRate();
        }
    }, [fromCurrency, toCurrency, activeTab]);

    // Handle conversion amount change
    const handleConvertAmountChange = (e) => {
        const value = e.target.value;
        setConvertAmount(value);

        if (value && exchangeRate) {
            const converted = (parseFloat(value) * exchangeRate).toFixed(2);
            setConvertedAmount(converted);
        } else {
            setConvertedAmount('');
        }
    };

    // Swap currencies
    const swapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    const formatDate = (date) => {
        if (!date) return 'Never';
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };

    const categoryIcons = {
        housing: housingIcon,
        food: foodIcon,
        transport: transportIcon,
        study: studyIcon,
        entertainment: entertainmentIcon,
        healthcare: healthcareIcon,
        other: otherIcon
    };

    const categoryLabels = {
        housing: 'Housing',
        food: 'Food',
        transport: 'Transport',
        study: 'Study',
        entertainment: 'Entertainment',
        healthcare: 'Healthcare',
        other: 'Other'
    };

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
        <>
            <style>{mobileStyles}</style>
            <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
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
                            <option key={cat} value={cat}>{categoryLabels[cat]}</option>
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
                    + Add Expense
                </button>
            </form>

            <div style={{ marginBottom: '30px' }}>
                <h2>Summary</h2>
                <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Total: €{totalExpenses.toFixed(2)}</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
                    {categories.map(cat => (
                        totalByCategory[cat] > 0 && (
                            <div key={cat} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <img src={categoryIcons[cat]} alt={cat} style={{ width: '20px', height: '20px' }} />
                                <div><strong>{categoryLabels[cat]}:</strong> €{totalByCategory[cat].toFixed(2)}</div>
                            </div>
                        )
                    ))}
                </div>
            </div>

            <div>
                <h2 style={{ fontSize: '18px' }}>Expense List</h2>
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
                                    <td style={{ padding: '10px', border: '1px solid #ddd', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <img src={categoryIcons[expense.category]} alt={expense.category} style={{ width: '20px', height: '20px' }} />
                                        {categoryLabels[expense.category]}
                                    </td>
                                    <td style={{ padding: '10px', textAlign: 'right', border: '1px solid #ddd' }}>
                                        {expense.currency} {expense.amount.toFixed(2)}
                                    </td>
                                    <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd' }}>
                                        <button
                                            onClick={() => deleteExpense(expense.id)}
                                            style={{ padding: '5px 10px', cursor: 'pointer', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}
                                        >
                                            × Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Currency Converter Section */}
            <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginTop: '30px' }}>
                <h2 style={{ textAlign: 'center', color: '#333', marginTop: 0 }}>Currency Converter</h2>

                        {/* From Currency */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
                                From Currency
                            </label>
                            <select
                                value={fromCurrency}
                                onChange={(e) => setFromCurrency(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    fontSize: '16px',
                                    border: '2px solid #ddd',
                                    borderRadius: '8px',
                                    backgroundColor: 'white',
                                    cursor: 'pointer'
                                }}
                            >
                                {allCurrencies.map(curr => (
                                    <option key={curr} value={curr}>{curr}</option>
                                ))}
                            </select>
                        </div>

                        {/* Convert Amount */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
                                Amount
                            </label>
                            <input
                                type="number"
                                value={convertAmount}
                                onChange={handleConvertAmountChange}
                                placeholder="Enter amount"
                                step="0.01"
                                min="0"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    fontSize: '16px',
                                    border: '2px solid #ddd',
                                    borderRadius: '8px',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>

                        {/* Swap Button */}
                        <button
                            onClick={swapCurrencies}
                            style={{
                                width: '100%',
                                padding: '12px',
                                backgroundColor: '#663399',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                marginBottom: '20px'
                            }}
                        >
                            ↕ Swap Currencies
                        </button>

                        {/* To Currency */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
                                To Currency
                            </label>
                            <select
                                value={toCurrency}
                                onChange={(e) => setToCurrency(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    fontSize: '16px',
                                    border: '2px solid #ddd',
                                    borderRadius: '8px',
                                    backgroundColor: 'white',
                                    cursor: 'pointer'
                                }}
                            >
                                {allCurrencies.map(curr => (
                                    <option key={curr} value={curr}>{curr}</option>
                                ))}
                            </select>
                        </div>

                        {/* Converted Amount */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
                                Converted Amount
                            </label>
                            <div style={{
                                width: '100%',
                                padding: '12px',
                                fontSize: '16px',
                                border: '2px solid #ddd',
                                borderRadius: '8px',
                                backgroundColor: '#f9f9f9',
                                color: '#333',
                                fontWeight: 'bold'
                            }}>
                                {convertLoading ? 'Loading...' : (convertedAmount || '-')} {toCurrency}
                            </div>
                        </div>

                        {/* Error Message */}
                        {convertError && (
                            <div style={{
                                padding: '12px',
                                backgroundColor: '#fee',
                                color: '#c33',
                                borderRadius: '8px',
                                marginBottom: '20px',
                                border: '1px solid #fcc'
                            }}>
                                ! Error: {convertError}
                            </div>
                        )}

                        {/* Exchange Rate Info */}
                        {exchangeRate && !convertError && (
                            <div style={{
                                padding: '15px',
                                backgroundColor: '#f0f0f0',
                                borderRadius: '8px',
                                marginBottom: '15px',
                                border: '1px solid #ddd'
                            }}>
                                <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}>
                                    <strong>Exchange Rate:</strong> 1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
                                </p>
                                <p style={{ margin: '5px 0', color: '#999', fontSize: '12px' }}>
                                    Last updated: {formatDate(lastUpdated)}
                                </p>
                            </div>
                        )}

                        {/* Refresh Button */}
                        <button
                            onClick={fetchExchangeRate}
                            disabled={convertLoading}
                            style={{
                                width: '100%',
                                padding: '12px',
                                backgroundColor: convertLoading ? '#ccc' : '#28a745',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                cursor: convertLoading ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {convertLoading ? 'Refreshing...' : '↻ Refresh Rates'}
                        </button>
            </div>
            </div>
        </>
    );
}