const db = require('./database');
const { parse } = require('json2csv');
const fs = require('fs');

function exportToCSV() {
    // Get all customers from database
    const customers = db.getAllCustomers();
    
    // Transform balance from cents to dollars for readability
    const customersForExport = customers.map(c => ({
        ...c,
        balance_dollars: (c.balance / 100).toFixed(2),
        created_date: new Date(c.created * 1000).toISOString()
    }));
    
    // Convert to CSV
    const csv = parse(customersForExport);
    
    // Write to file
    const filename = `stripe_customers_${Date.now()}.csv`;
    fs.writeFileSync(filename, csv);
    
    console.log(`✓ Exported ${customers.length} customers to ${filename}`);
}

// Run export
db.initializeDatabase();
exportToCSV();