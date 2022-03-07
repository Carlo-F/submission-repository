import patientEntries from "../../data/patients";

import { patientEntry } from "../types";

const getPatients = (): Omit<patientEntry, 'ssn'>[] => {
    return patientEntries.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

export default {
    getPatients
};