import patientEntries from "../../data/patients";
import { patientEntry, newPatientEntry } from "../types";
import { v1 as uuid } from 'uuid';

const getPatients = (): Omit<patientEntry, 'ssn'>[] => {
    return patientEntries.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (entry: newPatientEntry) : patientEntry => {
    const id = uuid();
    const newPatient = {
        ...entry,
        id: id
    };

    patientEntries.push(newPatient);
    return newPatient;
}

export default {
    getPatients,
    addPatient
};