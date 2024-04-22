
This project aims to offer a comprehensive solution for managing file uploads, processing CSV data, and generating import process reports. Using Express.js and SQLite, it provides a stable and efficient framework for handling data import tasks.

In today's data-driven landscape, businesses and organizations require efficient data management and processing solutions. This repository addresses this need by simplifying the process of importing data from CSV files into a SQLite database, while also offering valuable insights through summary reports.

Key features of this project include:

File Uploads: Users can upload CSV files via a designated endpoint (/upload), with robust error handling and validation mechanisms in place.
CSV Data Processing: Uploaded CSV files are processed to insert records into SQLite tables. The application utilizes the csv-parser library to parse CSV data effectively.
Summary Generation: Users can retrieve a summary of the import process, including record counts for each table and total import time, via the /summary endpoint.
Error Handling: The application incorporates proper error handling and validation to ensure reliability during file uploads and database operations.
By leveraging these features, users can efficiently manage their data import activities and gain valuable insights into the imported data.

# project

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.1.4. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
