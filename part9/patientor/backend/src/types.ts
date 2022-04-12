export interface diagnoseEntry {
    code: string,
    name: string,
    latin?: string
}

export interface patientEntry {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string,
    entries: Array<Entry>
}

export type newPatientEntry = Omit<patientEntry,'id'>;

export type PublicPatient = Omit<patientEntry, 'ssn' | 'entries' >;

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
  }

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<diagnoseEntry['code']>;
  }
  
  export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }

  export enum EntryType {
      "HealthCheck",
      "Hospital",
      "OccupationalHealthcare"
  }
  
  export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
  }
  
  export interface HospitalEntry extends BaseEntry {
    type: "Hospital",
    discharge?: {
      date: string,
      criteria: string,
    }
  }
  
  export interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare",
    employerName: string,
    sickLeave?: {
      startDate: string,
      endDate: string,
    }
  }
  
  export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

  export type newEntry = Omit<Entry,'id'>;