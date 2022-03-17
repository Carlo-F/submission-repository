export interface diagnoseEntry {
    code: string,
    name: string,
    latin?: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface patientEntry {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string,
    entries: diagnoseEntry[]
}

export type newPatientEntry = Omit<patientEntry,'id'>;

export type PublicPatient = Omit<patientEntry, 'ssn' | 'entries' >;

export enum Gender {
    'male',
    'female',
    'other'
}