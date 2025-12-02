import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-regular-svg-icons';
import { faUtensils, faBus, faBook, faTv, faPills, faThumbtack } from '@fortawesome/free-solid-svg-icons';

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
        housing: faHouse,
        food: faUtensils,
        transport: faBus,
        study: faBook,
        entertainment: faTv,
        healthcare: faPills,
        other: faThumbtack
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
            
            {/* Currency Converter Section */}
            <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: 'white' }}>
                        <FontAwesomeIcon icon={categoryIcons[category]} style={{ fontSize: '20px', color: '#666' }} />
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            style={{ flex: 1, padding: '4px', fontSize: '16px', border: 'none', outline: 'none', backgroundColor: 'transparent' }}
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{categoryLabels[cat]}</option>
                            ))}
                        </select>
                    </div>
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
                                <FontAwesomeIcon icon={categoryIcons[cat]} style={{ fontSize: '18px', color: '#666' }} />
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
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <FontAwesomeIcon icon={categoryIcons[expense.category]} style={{ fontSize: '16px', color: '#666' }} />
                                            {categoryLabels[expense.category]}
                                        </div>
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
            </div>
        </>
    );
}