const axios = require('axios');

const BASE_URL = 'https://jsonplaceholder.typicode.com/users';

// Fetch user data
async function fetchUserData() {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}

// Transform user data
function transformUserData(users) {
    return users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        city: user.address.city,
        company: user.company.name,
        timestamp: new Date().toISOString()
    }));
}

// Main function
async function main() {
    console.log('Fetching user data...\n');
    
    const rawData = await fetchUserData();
    const cleanData = transformUserData(rawData);
    
    console.log('Transformed Data:', cleanData);
}

main();