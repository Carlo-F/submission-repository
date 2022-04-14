import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography } from "@material-ui/core";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { useStateValue, setPatient } from "../state";
import EntryDetails from "./EntryDetails";
import { EntryFormValues, AddEntryForm } from "../AddEntryModal/AddEntryForm";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();

  const [{ patient, diagnoses }, dispatch] = useStateValue();

  if(id && patient?.id !== id) {
  const fetchPatient = async () => {
    try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatient(patientFromApi));
    } catch (e) {
      console.error(e);
    }
  };
  void fetchPatient();
  }
  
  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      await new Promise((resolve) => {
        resolve(console.log(values));
      });
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
      }
    }
  };

  return (
    <div className="App">
      <Box>
        <Typography align="center" variant="h6">
          Patient Info
        </Typography>
      </Box>
      <Box>
        <p>{patient?.name}, {patient?.gender=='female'?<FemaleIcon />:<MaleIcon />}</p>
        <p>{patient?.ssn}</p>
        <p>{patient?.occupation}</p>
      </Box>
      <Box>
        <Typography align="left" variant="h6">
          entries
        </Typography>
      </Box>
      <Box>
        {patient?.entries.map(entry => {
          return (
            <div key={entry.id}>
              <EntryDetails diagnoses={diagnoses} entry={entry} />
            </div>
            );
          }
        )}
      </Box>
      <Box>
        <Typography align="left" variant="h6">
          Add new entry
        </Typography>
        <AddEntryForm
        onSubmit={submitNewEntry}
        onCancel={()=>console.log('submit')}
      />
      </Box>
    </div>
  );
};

export default PatientPage;
