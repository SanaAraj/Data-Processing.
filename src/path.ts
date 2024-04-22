import { type Request, type Response } from 'express';
import db from '../data/connect.ts'; // Import the database connection

// Import the tables from the appropriate file
import {
    AccountRequest,
    InspectionRequest,
    NewActivity,
    NewLicense,
    StampLicense
} from './Tables';

// Define the type of the record parameter
type RecordType = Record<string, any>;

// Function to fetch and parse data from a given table
const fetchAndParseData = async (
    table: any,
    parseFields: Record<string, string> = {}
): Promise<RecordType[]> => {
    // Fetch data from the specified table
    const data = await db.select().from(table).execute();
    
    // Parse JSON fields if specified in parseFields
    return data.map((record: RecordType) => {
        const parsedRecord = { ...record };
        for (const [field, defaultValue] of Object.entries(parseFields)) {
            // Use JSON.parse() to parse the specified fields in the record
            parsedRecord[field] = JSON.parse(parsedRecord[field] || defaultValue);
        }
        return parsedRecord;
    });
};

// Function to handle database responses
const handleDatabaseResponse = async (req: Request, res: Response, table: any, parseFields: Record<string, string> = {}) => {
    try {
        const data = await fetchAndParseData(table, parseFields);
        res.status(200).json(data);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Request handlers for different types of requests
const getAccountRequests = (req: Request, res: Response) => {
    handleDatabaseResponse(req, res, AccountRequest, { Permission: '' });
};

const getInspectionRequests = (req: Request, res: Response) => {
    handleDatabaseResponse(req, res, InspectionRequest);
};

const getNewActivities = (req: Request, res: Response) => {
    handleDatabaseResponse(req, res, NewActivity, { Activities: '' });
};

const getNewLicenses = (req: Request, res: Response) => {
    handleDatabaseResponse(req, res, NewLicense);
};

const getStampLicenses = (req: Request, res: Response) => {
    handleDatabaseResponse(req, res, StampLicense);
};

// Export the request handlers
export {
    getAccountRequests,
    getInspectionRequests,
    getNewActivities,
    getNewLicenses,
    getStampLicenses
};
