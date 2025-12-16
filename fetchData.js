const Database = require('better-sqlite3');

// Create/connect to database
const db = new Database('api_data.db');

// Create table if it doesn't exist
function initializeDatabase() {
    const createTable = `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            city TEXT,
            company TEXT,
            timestamp TEXT NOT NULL
        )
    `;
    
    db.exec(createTable);
    console.log('✓ Database initialized');
}

// Insert user data
function insertUser(user) {
    const insert = db.prepare(`
        INSERT OR REPLACE INTO users (id, name, email, city, company, timestamp)
        VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    insert.run(
        user.id,
        user.name,
        user.email,
        user.city,
        user.company,
        user.timestamp
    );
}

// Insert multiple users
function insertUsers(users) {
    const insertMany = db.transaction((users) => {
        for (const user of users) {
            insertUser(user);
        }
    });
    
    insertMany(users);
    console.log(`✓ Inserted ${users.length} users into database`);
}

// Query all users
function getAllUsers() {
    const query = db.prepare('SELECT * FROM users');
    return query.all();
}

// Query by city
function getUsersByCity(city) {
    const query = db.prepare('SELECT * FROM users WHERE city = ?');
    return query.all(city);
}

// Export functions
module.exports = {
    initializeDatabase,
    insertUsers,
    getAllUsers,
    getUsersByCity
};