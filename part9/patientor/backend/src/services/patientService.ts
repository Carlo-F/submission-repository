import patientEntries from "../../data/patients";
import { patientEntry } from "../types";
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

const addPatient = ( name: string, dateOfBirth: string, ssn: string, gender: string, occupation: string) : patientEntry => {
    const id = uuid();
    const newPatient = {
        id: id,
        name: name,
        dateOfBirth: dateOfBirth,
        ssn: ssn,
        gender: gender,
        occupation: occupation
    };

    patientEntries.push(newPatient);
    return newPatient;
}

export default {
    getPatients,
    addPatient
};