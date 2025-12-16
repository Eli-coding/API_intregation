const Database = require('better-sqlite3');

// Create/connect to database
const db = new Database('stripe_data.db');

// Create table for Stripe customers
function initializeDatabase() {
    const createTable = `
        CREATE TABLE IF NOT EXISTS customers (
            id TEXT PRIMARY KEY,
            email TEXT NOT NULL,
            name TEXT,
            created INTEGER NOT NULL,
            currency TEXT,
            balance INTEGER,
            timestamp TEXT NOT NULL
        )
    `;
    
    db.exec(createTable);
    console.log('✓ Database initialized');
}

// Insert customer data
function insertCustomer(customer) {
    const insert = db.prepare(`
        INSERT OR REPLACE INTO customers (id, email, name, created, currency, balance, timestamp)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    
    insert.run(
        customer.id,
        customer.email,
        customer.name,
        customer.created,
        customer.currency,
        customer.balance,
        customer.timestamp
    );
}

// Insert multiple customers
function insertCustomers(customers) {
    const insertMany = db.transaction((customers) => {
        for (const customer of customers) {
            insertCustomer(customer);
        }
    });
    
    insertMany(customers);
    console.log(`✓ Inserted ${customers.length} customers into database`);
}

// Query all customers
function getAllCustomers() {
    const query = db.prepare('SELECT * FROM customers');
    return query.all();
}

// Query by currency
function getCustomersByCurrency(currency) {
    const query = db.prepare('SELECT * FROM customers WHERE currency = ?');
    return query.all(currency);
}

// Export functions
module.exports = {
    initializeDatabase,
    insertCustomers,
    getAllCustomers,
    getCustomersByCurrency
};