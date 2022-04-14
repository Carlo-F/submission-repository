import React from "react";
import { Box } from "@material-ui/core";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import HealingIcon from '@mui/icons-material/Healing';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { useStateValue } from "../state";
import { Entry, Diagnosis } from "../types";
import { assertNever } from "../utils";

type Props = {
diagnoses: {[code:string]: Diagnosis},
  entry: Entry;
};

const HospitalEntry = ({ diagnoses, entry } : Props) => {
    return (
        <Box sx={{border: '1px solid green', marginBottom: 10, padding: 10}}>
            <p>{entry.date} <LocalHospitalIcon/> ({entry.type} Entry)</p>
            <p><em>{entry.description}</em></p>
            {entry.diagnosisCodes && (
            <ul>
                {entry.diagnosisCodes.map(diagnosisCode => <li key={diagnosisCode}>{diagnosisCode} - {diagnoses[diagnosisCode]?.name}</li>)}
            </ul>
            )}
            <p>diagnose by {entry.specialist}</p>
        </Box>
    );
};

const OccupationalHealthcareEntry = ({ diagnoses, entry } : Props) => {
    return (
        <Box sx={{border: '1px solid red', marginBottom: 10, padding: 10}}>
            <p>{entry.date} <HealingIcon/> ({entry.type} Entry)</p>
            <p><em>{entry.description}</em></p>
            {entry.diagnosisCodes && (
            <ul>
                {entry.diagnosisCodes.map(diagnosisCode => <li key={diagnosisCode}>{diagnosisCode} - {diagnoses[diagnosisCode]?.name}</li>)}
            </ul>
            )}
            <p>diagnose by {entry.specialist}</p>
        </Box>
    );
};

const HealthCheckEntry = ({ diagnoses, entry } : Props) => {
    return (
        <Box sx={{border: '1px solid blue', marginBottom: 10, padding: 10}}>
            <p>{entry.date} <HealthAndSafetyIcon/> ({entry.type} Entry)</p>
            <p><em>{entry.description}</em></p>
            {entry.diagnosisCodes && (
            <ul>
                {entry.diagnosisCodes.map(diagnosisCode => <li key={diagnosisCode}>{diagnosisCode} - {diagnoses[diagnosisCode]?.name}</li>)}
            </ul>
            )}
            <p>diagnose by {entry.specialist}</p>
        </Box>
    );
};

const EntryDetails = ({ entry }: Props) => {

    const [{ diagnoses }] = useStateValue();
    
    switch (entry.type) {
        case "Hospital":
            return <HospitalEntry diagnoses={diagnoses} entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntry diagnoses={diagnoses} entry={entry} />;
        case "HealthCheck":
            return <HealthCheckEntry diagnoses={diagnoses} entry={entry} />;
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;