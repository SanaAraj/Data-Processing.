import { type Request, type Response } from 'express';
import {
    AccountRequest,
    InspectionRequest,
    NewActivity,
    NewLicense,
    StampLicense
} from './Tables'; 
import db from '../data/connect.ts';
import console from 'console';

// Function to calculate and display the total time taken for the import process
const measureImportTime = async () => {
    try {
        // Record the start time
        const startTime = process.hrtime();

        // Call functions to get the count of records in each table
        const accountRequestsCount = await getAccountRequestsCount();
        const inspectionRequestsCount = await getInspectionRequestsCount();
        const newLicensesCount = await getNewLicensesCount();
        const addActivityRequestsCount = await getAddActivityRequestsCount();
        const stampLicenseRequestsCount = await getStampLicenseRequestsCount();

        // Record the end time
        const endTime = process.hrtime(startTime);
        
        // Calculate the total time taken (in seconds)
        const totalTimeInSeconds = endTime[0] + endTime[1] / 1e9;

        // Display the counts and total time taken
        console.log(`Account Requests: ${accountRequestsCount}`);
        console.log(`Inspection Requests: ${inspectionRequestsCount}`);
        console.log(`New Licenses: ${newLicensesCount}`);
        console.log(`Add Activity Requests: ${addActivityRequestsCount}`);
        console.log(`Stamp License Requests: ${stampLicenseRequestsCount}`);
        console.log(`Total time taken to import the complete dataset: ${totalTimeInSeconds.toFixed(3)} seconds`);

    } catch (error) {
        console.error('Error measuring import time:', error);
    }
};

// Function to get the count of records from the AccountRequest table
const getAccountRequestsCount = async (): Promise<number> => {
    try {
        const accountRequests = await db
            .select()
            .from(AccountRequest)
            .execute();

        return accountRequests.length;
    } catch (error) {
        console.error('Error fetching account requests count:', error);
        throw new Error('Internal Server Error');
    }
};

// Similarly, you can add error handling and timing functions for other tables.

const getInspectionRequestsCount = async (): Promise<number> => {
    try {
        const inspectionRequests = await db
            .select()
            .from(InspectionRequest)
            .execute();

        return inspectionRequests.length;
    } catch (error) {
        console.error('Error fetching inspection requests count:', error);
        throw new Error('Internal Server Error');
    }
};

// Function to get the count of records from the NewLicense table
const getNewLicensesCount = async (): Promise<number> => {
    try {
        const newLicenses = await db
            .select()
            .from(NewLicense)
            .execute();

        return newLicenses.length;
    } catch (error) {
        console.error('Error fetching new licenses count:', error);
        throw new Error('Internal Server Error');
    }
};

// Function to get the count of records from the NewActivity table
const getAddActivityRequestsCount = async (): Promise<number> => {
    try {
        const addActivityRequests = await db
            .select()
            .from(NewActivity)
            .execute();

        return addActivityRequests.length;
    } catch (error) {
        console.error('Error fetching add activity requests count:', error);
        throw new Error('Internal Server Error');
    }
};

// Function to get the count of records from the StampLicense table
const getStampLicenseRequestsCount = async (): Promise<number> => {
    try {
        const stampLicenseRequests = await db
            .select()
            .from(StampLicense)
            .execute();

        return stampLicenseRequests.length;
    } catch (error) {
        console.error('Error fetching stamp license requests count:', error);
        throw new Error('Internal Server Error');
    }
};


// Continue similarly for the remaining tables.

measureImportTime(); // Call the function to measure and display the import time

export {
    getAccountRequestsCount,
    getInspectionRequestsCount,
    getNewLicensesCount,
    getAddActivityRequestsCount,
    getStampLicenseRequestsCount
};
