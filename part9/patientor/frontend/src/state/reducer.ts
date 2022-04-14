import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
    type: "SET_DIAGNOSIS_LIST",
    payload: Diagnosis[]
  }
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
  }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
  }
  | {
      type: "SET_PATIENT";
      payload: Patient;
  }
  | {
    type: "ADD_ENTRY";
    payload: Entry;
    };
    
export const setDiagnosisList = (diagnosisList: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnosisList
  };
};

export const setPatientList = (patientList: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientList
  };
};

export const addPatient = (newPatientData: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: newPatientData
  };
};

export const setPatient = (patientData: Patient): Action => {
  return {
    type: "SET_PATIENT",
    payload: patientData
  };
};

export const addEntry = (newEntryData: Entry): Action => {
  return {
    type: "ADD_ENTRY",
    payload: newEntryData
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT":
      return {
        ...state,
        patient: action.payload
      };
    default:
      return state;
  }
};
