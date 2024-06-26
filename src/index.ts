import express, { type Request, type Response } from 'express';
import multer from 'multer';
import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';
import { 
  getAccountRequestsCount,
  getInspectionRequestsCount,
  getNewLicensesCount,
  getAddActivityRequestsCount,
 getStampLicenseRequestsCount
 } from './count.ts';


const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({
  dest: 'uploads/',
  fileFilter: (_req, file, cb) => {
    if (file.mimetype !== 'text/csv') {
      cb(new Error('Only CSV files are allowed.'));
    } else {
      cb(null, true);
    }
  }
}).single('csvFile');

const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  }
  console.log('Connected to the database.');
});

const getRequestTableName = (requestType: number): string | undefined => {
  switch (requestType) {
    case 1:
      return 'AccountRequest';
    case 2:
      return 'InspectionRequest';
    case 3:
      return 'NewLicence';
    case 4:
      return 'AddActivityRequest';
    case 5:
      return 'StampLicenseLetterRequest';
    default:
      return undefined;
  }
};

const processCSV = (filePath: string, callback: (error: any) => void) => {
  const parser = csv();
  const data: { [key: string]: any[] } = {};
  let isHeaderChecked = false;

  parser.on('data', (row: any) => {
    if (!isHeaderChecked) {
      const expectedHeaders = ['RequestID', 'RequestType', 'RequestStatus', 'RequestData'];
      const actualHeaders = Object.keys(row);
      if (!expectedHeaders.every(header => actualHeaders.includes(header))) {
        console.error('CSV file structure does not match the expected structure.');
        parser.end();
        return;
      }
      isHeaderChecked = true;
    }
    const { RequestType, RequestID, RequestStatus, RequestData } = row;
    if (!data[RequestType]) {
      data[RequestType] = [];
    }
    data[RequestType].push({ RequestID, RequestStatus, RequestData });
  });

  parser.on('end', () => {
    try {
      const queries: { query: string; params: any[] }[] = [];
      for (const [requestType, records] of Object.entries<any[]>(data)) {
        const table = getRequestTableName(parseInt(requestType));
        if (table) {
          const query = `INSERT INTO ${table} (RequestID, RequestType, RequestStatus, RequestData) VALUES (?, ?, ?, ?)`;
          queries.push({ query, params: records.map(({ RequestID, RequestStatus, RequestData }) => [RequestID, requestType, RequestStatus, RequestData]) });
        }
      }
      if (queries.length > 0) {
        db.serialize(() => {
          for (const query of queries) {
            db.run(query.query, query.params, (err) => {
              if (err) {
                console.error('Error inserting record:', err.message);
              }
            });
          }
        });
      }
    } catch (error) {
      console.error('Error processing CSV:', error);
    }
  });

  fs.createReadStream(filePath)
    .on('error', err => {
      console.error('Error reading the file:', err);
      parser.end();
    })
    .pipe(parser);
};

app.post('/upload', (req: Request, res: Response): void => {
    upload(req, res, (err) => {
        if (err) {
            if (err instanceof multer.MulterError) {
                console.error('Multer error:', err.message);
                return res.status(400).send(`File upload failed: ${err.message}`);
            }
            console.error('File upload error:', err.message);
            return res.status(500).send(`Internal Server Error: ${err.message}`);
        }

        // Check if a file was uploaded
        const file = req.file;
        if (!file) {
            return res.status(400).send('No file uploaded.');
        }

        const filePath = file.path;
        processCSV(filePath, (error) => {
            if (error) {
                console.error('Error processing CSV:', error);
                return res.status(500).send(`Internal Server Error: ${error.message}`);
            }
            res.send('File uploaded and processed successfully.');
        });
    });
});

app.get('/summary', async (req: Request, res: Response): Promise<void> => {
    try {
        // Fetch counts asynchronously using Promise.all
        const [
            accountRequestsCount,
            inspectionRequestsCount,
            newLicensesCount,
            addActivityRequestsCount,
            stampLicenseRequestsCount
        ] = await Promise.all([
            getAccountRequestsCount(),
            getInspectionRequestsCount(),
            getNewLicensesCount(),
            getAddActivityRequestsCount(),
            getStampLicenseRequestsCount()
        ]);

        // Calculate total count
        const total = accountRequestsCount + inspectionRequestsCount + newLicensesCount + addActivityRequestsCount + stampLicenseRequestsCount;

        // Construct summary object
        const summary = {
            AccountRequest: accountRequestsCount,
            InspectionRequest: inspectionRequestsCount,
            NewLicense: newLicensesCount,
            AddActivityRequest: addActivityRequestsCount,
            StampLicenseLetterRequest: stampLicenseRequestsCount,
            Total: total
        };

        // Send summary as JSON response
        res.json(summary);
    } catch (error) {
        // Handle errors
        console.error('Error fetching counts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
