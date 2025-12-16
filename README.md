# Stripe Customer Data Integration Pipeline

Automated ETL (Extract, Transform, Load) pipeline demonstrating enterprise fintech implementation skills including secure API integration, financial data processing, database operations, and business reporting.

## Overview

This project integrates with Stripe's payment platform API to extract customer data, transforms it for analysis, stores it in a SQLite database, and provides CSV export capabilities for business intelligence tools. Built to demonstrate implementation engineering capabilities for fintech and SaaS platforms.

## Technologies Used

- **Node.js** - Runtime environment
- **Stripe API** - Payment platform integration
- **SQLite** (better-sqlite3) - Lightweight database
- **json2csv** - Data export functionality
- **dotenv** - Secure credential management

## Architecture
```
Stripe API → Extract → Transform → Load → Database → Export to CSV
```

## Features

1. **Secure API Integration**: Authenticates with Stripe using API keys in test mode
2. **Financial Data Processing**: Handles customer records, balances, and currency data
3. **Data Transformation**: Standardizes API responses into consistent database schema
4. **Database Operations**: Persists customer data with full CRUD capabilities
5. **Business Reporting**: Generates CSV exports for Excel and BI tool analysis
6. **Error Handling**: Graceful failure management and logging

## Setup Instructions

1. Clone this repository
2. Install dependencies:
```bash
   npm install
```

3. Create `.env` file and add your Stripe test API key:
```
   STRIPE_API_KEY=sk_test_your_key_here
```

4. Run the ETL pipeline:
```bash
   node fetchData.js
```

5. Export data to CSV:
```bash
   node export.js
```

## Project Structure
```
api-integration-project/
├── fetchData.js      # Main ETL pipeline with Stripe integration
├── database.js       # Database operations and queries
├── export.js         # CSV export functionality
├── stripe_data.db    # SQLite database (generated)
├── .env              # API credentials (not committed)
├── package.json      # Dependencies
└── README.md         # Documentation
```

## Database Schema
```sql
CREATE TABLE customers (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL,
    name TEXT,
    created INTEGER NOT NULL,
    currency TEXT,
    balance INTEGER,
    timestamp TEXT NOT NULL
)
```

## Use Cases

This project demonstrates skills applicable to:
- Payment platform implementation and integration
- Financial data migration and onboarding
- Customer data synchronization across systems
- Automated reporting for finance and operations teams
- Enterprise SaaS implementation workflows

## Skills Demonstrated

- **API Integration**: REST API authentication and data extraction
- **Financial Data Handling**: Processing balances, currencies, customer records
- **ETL Pipeline Design**: Extract, transform, load workflows
- **Database Operations**: SQL schema design, CRUD operations, queries
- **Security Best Practices**: Credential management, test environment usage
- **Data Export**: Business-friendly reporting formats
- **Technical Documentation**: Clear setup instructions and architecture

## Security Notes

- Uses Stripe test mode API keys only
- Credentials stored in `.env` file (excluded from version control)
- No production data or live API keys used
- Follows Stripe API best practices for authentication

## Future Enhancements

- Add webhook integration for real-time updates
- Implement data validation and cleansing rules
- Add scheduling for automated daily runs
- Create Power BI or Tableau dashboard
- Add unit tests and integration tests
- Support multiple payment processors

---

**Author**: Elizabeth Rodriguez  
**Purpose**: Technical portfolio demonstrating implementation engineering and fintech integration capabilities  
**Technologies**: Node.js, Stripe API, SQLite, REST APIs
