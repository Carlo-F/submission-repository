import { newPatientEntry, Gender, Entry, EntryType, HealthCheckEntry, HealthCheckRating } from "./types";
import { v1 as uuid } from 'uuid';

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: Array<Entry> };

const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation, entries } : Fields): newPatientEntry => {
    const newEntry: newPatientEntry = {
        name: parseName(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        entries: parseEntries(entries)
    };

    return newEntry;
};

export const toHealthCheck = (object: any): HealthCheckEntry => {
    const newEntry = {
        id: uuid(),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        type: object.type,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        description: parseString(object.description),
        date: parseDate(object.date),
        specialist: parseString(object.specialist)
    };

    return newEntry;
};

export const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (param: any): param is EntryType => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(EntryType).includes(param);
};

// const parseType = (type: unknown): EntryType => {
//     if (!type || !isEntryType(type)) {
//         throw new Error('Incorrect or missing entry type: ' + type);
//     }

//     return type;
// };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
    if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
        throw new Error('Incorrect or missing healthCheck rating: ' + healthCheckRating);
    }

    return healthCheckRating;
};

const parseEntries = (entries: Array<Entry>): Array<Entry> => {
    entries.forEach(entry => {
        if(!entry.type || !isEntryType(entry.type)) {
            throw new Error('Incorrect or missing entry type: ' + entry.type);
        }
    });

    return entries;
};

const parseString = (param: unknown) : string => {
    if (!param || !isString(param)) {
        throw new Error('Incorrect or missing '+ param);
    }

    return param;
};

const parseName = (name: unknown) : string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }

    return name;
};

const parseSsn = (ssn: unknown) : string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }

    return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};
  
  const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
  };

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }

    return occupation;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };
  
const parseDate = (date: unknown): string => {
if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
}
return date;
};

export default toNewPatientEntry;