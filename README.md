# API Integration & Data Pipeline

Automated ETL (Extract, Transform, Load) pipeline that demonstrates enterprise implementation skills including API integration, data transformation, database operations, and reporting.

## Overview

This project extracts user data from a REST API, transforms it into a standardized format, stores it in a SQLite database, and provides export capabilities for business intelligence tools.

## Technologies Used

- **Node.js** - Runtime environment
- **Axios** - HTTP client for API calls
- **SQLite** (better-sqlite3) - Lightweight database
- **json2csv** - Data export functionality

## Architecture
```
API Source → Extract → Transform → Load → Database → Export
```

## Features

1. **API Integration**: Connects to REST API and handles responses
2. **Data Transformation**: Standardizes raw API data into consistent schema
3. **Database Storage**: Persists data in SQLite with CRUD operations
4. **Data Export**: Generates CSV files for business reporting
5. **Error Handling**: Graceful failure management

## Setup Instructions

1. Clone this repository
2. Install dependencies:
```bash
   npm install
```

3. Run the ETL pipeline:
```bash
   node fetchData.js
```

4. Export data to CSV:
```bash
   node export.js
```

## Project Structure
```
api-integration-project/
├── fetchData.js      # Main ETL pipeline
├── database.js       # Database operations
├── export.js         # CSV export functionality
├── api_data.db       # SQLite database (generated)
├── package.json      # Dependencies
└── README.md         # Documentation
```

## Database Schema
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    city TEXT,
    company TEXT,
    timestamp TEXT NOT NULL
)
```

## Use Cases

This project demonstrates skills applicable to:
- Customer data onboarding and migration
- System integration projects
- Automated reporting pipelines
- Enterprise implementation workflows

## Skills Demonstrated

- REST API integration
- ETL pipeline design
- SQL database operations
- Data transformation and validation
- Technical documentation
- Error handling and logging

## Future Enhancements

- Add authentication for production APIs
- Implement scheduling for automated runs
- Add data validation rules
- Create visualization dashboard
- Add unit tests

---

**Author**: Elizabeth Rodriguez  
**Purpose**: Technical portfolio demonstrating implementation engineering capabilities