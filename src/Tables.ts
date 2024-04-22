import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// Define a function to create a table with a given schema
const defineTable = (tableName: string, schema: Record<string, any>) => {
    return sqliteTable(tableName, schema);
};

// Define tables with schemas
const AccountRequest = defineTable('AccountRequest', {
    RequestID: integer('RequestID').primaryKey(),
    CompanyName: text('CompanyName'),
    RequestName: text('RequestName'),
    ApplicantName: text('ApplicantName'),
    Username: text('Username'),
    ContactEmail: text('ContactEmail'),
    Permission: text('Permission')
});

const InspectionRequest = defineTable('InspectionRequest', {
    RequestID: integer('RequestID').primaryKey(),
    CompanyName: text('CompanyName'),
    InspectionDate: text('InspectionDate'),
    InspectionTime: text('InspectionTime'),
    InspectionType: text('InspectionType')
});

const NewLicense = defineTable('NewLicense', {
    RequestID: integer('RequestID').primaryKey(),
    CompanyName: text('CompanyName'),
    LicenceType: text('LicenceType'),
    IsOffice: text('IsOffice'),
    OfficeName: text('OfficeName'),
    OfficeServiceNumber: text('OfficeServiceNumber'),
    RequestDate: text('RequestDate'),
    Activities: text('Activities')
});

const NewActivity = defineTable('AddActivityRequest', {
    RequestID: integer('RequestID').primaryKey(),
    CompanyName: text('CompanyName'),
    LicenceID: text('LicenceID'),
    Activities: text('Activities')
});

const StampLicense = defineTable('StampLicenseLetterRequest', {
    RequestID: integer('RequestID').primaryKey(),
    CompanyName: text('CompanyName'),
    LicenceID: text('LicenceID'),
    RequestDate: text('RequestDate')
});

// Export all defined tables
export {
    AccountRequest,
    InspectionRequest,
    NewActivity,
    NewLicense,
    StampLicense
};
