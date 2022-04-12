import patientEntries from "../../data/patients";
import { patientEntry, newPatientEntry, PublicPatient, Entry } from "../types";
import { v1 as uuid } from 'uuid';
import { toHealthCheck, assertNever } from "../utils";

const getPatients = (): PublicPatient[] => {
    return patientEntries.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const findPatientById = (id: string): patientEntry | undefined => {
    return patientEntries.find(entry => entry.id === id);
};

const addPatient = (entry: newPatientEntry): patientEntry => {
    const id = uuid();
    const newPatient = {
        ...entry,
        entries: [],
        id: id
    };

    patientEntries.push(newPatient);
    return newPatient;
};

const addEntry = (userId: string, addedEntry: Entry): patientEntry => {
    const patient = patientEntries.find(patient => patient.id === userId);
    
    if (!patient) {
        throw new Error('No patient found');
    }
    
    const newEntry = toNewEntry(addedEntry);

    patient.entries.push(newEntry);
    return patient;
};

const toNewEntry = (newEntry: Entry): Entry => {

    switch (newEntry.type) {
        case "HealthCheck":
            return toHealthCheck(newEntry);
        case "Hospital":
            return toHealthCheck(newEntry);
        case "OccupationalHealthcare":
            return toHealthCheck(newEntry);
        default:
            return assertNever(newEntry);
    }
};

export default {
    getPatients,
    findPatientById,
    addPatient,
    addEntry
};