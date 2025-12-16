require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_API_KEY);
const db = require('./database');

// Fetch customer data from Stripe
async function fetchStripeCustomers() {
    try {
        console.log('Connecting to Stripe API...');
        const customers = await stripe.customers.list({
            limit: 100 // Get up to 100 customers
        });
        return customers.data;
    } catch (error) {
        console.error('Error fetching from Stripe:', error.message);
        return null;
    }
}

// Transform Stripe customer data
function transformCustomerData(customers) {
    return customers.map(customer => ({
        id: customer.id,
        email: customer.email || 'N/A',
        name: customer.name || 'N/A',
        created: customer.created,
        currency: customer.currency || 'usd',
        balance: customer.balance || 0,
        timestamp: new Date().toISOString()
    }));
}

// Create sample test customers (since you're new to Stripe)
async function createSampleCustomers() {
    console.log('Creating sample test customers...');
    
    const sampleCustomers = [
        { email: 'john.doe@example.com', name: 'John Doe', metadata: { company: 'Acme Corp' } },
        { email: 'jane.smith@example.com', name: 'Jane Smith', metadata: { company: 'TechStart' } },
        { email: 'bob.wilson@example.com', name: 'Bob Wilson', metadata: { company: 'FinServe Inc' } },
        { email: 'alice.brown@example.com', name: 'Alice Brown', metadata: { company: 'Global Bank' } },
        { email: 'charlie.davis@example.com', name: 'Charlie Davis', metadata: { company: 'PayTech Solutions' } }
    ];
    
    for (const customerData of sampleCustomers) {
        try {
            await stripe.customers.create(customerData);
        } catch (error) {
            // Customer might already exist, that's okay
            console.log(`Note: ${customerData.email} may already exist`);
        }
    }
    
    console.log('✓ Sample customers created');
}

// Main function
async function main() {
    console.log('Starting Stripe ETL Pipeline...\n');
    
    // Initialize database
    db.initializeDatabase();
    
    // Create sample customers first (only needed once)
    await createSampleCustomers();
    
    // Extract: Fetch from Stripe API
    console.log('\nExtracting customer data from Stripe API...');
    const rawData = await fetchStripeCustomers();
    
    if (!rawData || rawData.length === 0) {
        console.error('No customer data found');
        return;
    }
    
    // Transform: Clean and structure data
    console.log('Transforming data...');
    const cleanData = transformCustomerData(rawData);
    
    // Load: Save to database
    console.log('Loading data into database...');
    db.insertCustomers(cleanData);
    
    // Verify: Query and display results
    console.log('\n--- Database Contents ---');
    const allCustomers = db.getAllCustomers();
    console.log(`Total customers in database: ${allCustomers.length}`);
    console.log('\nSample data:');
    allCustomers.slice(0, 3).forEach(customer => {
        console.log(`  - ${customer.name} (${customer.email})`);
        console.log(`    ID: ${customer.id}, Balance: $${customer.balance / 100}`);
    });
    
    // Example query
    console.log('\n--- Customers by Currency ---');
    const usdCustomers = db.getCustomersByCurrency('usd');
    console.log(`USD customers: ${usdCustomers.length}`);
    
    console.log('\n✓ Stripe ETL Pipeline completed successfully!');
}

main();