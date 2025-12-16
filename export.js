const db = require('./database');
const { parse } = require('json2csv');
const fs = require('fs');

function exportToCSV() {
    // Get all users from database
    const users = db.getAllUsers();
    
    // Convert to CSV
    const csv = parse(users);
    
    // Write to file
    const filename = `user_data_${Date.now()}.csv`;
    fs.writeFileSync(filename, csv);
    
    console.log(`✓ Exported ${users.length} records to ${filename}`);
}

// Run export
db.initializeDatabase();
exportToCSV();