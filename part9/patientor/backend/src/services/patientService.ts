import patientEntries from "../../data/patients";
import { patientEntry, newPatientEntry, PublicPatient } from "../types";
import { v1 as uuid } from 'uuid';

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
        id: id
    };

    patientEntries.push(newPatient);
    return newPatient;
};

export default {
    getPatients,
    findPatientById,
    addPatient
};