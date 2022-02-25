import React from "react";
import { Alert } from '@material-ui/lab';

const Notification = ({ message }) => (
  <div>
    {(message &&
    <Alert severity="success">
      {message}
    </Alert>
  )}
  </div>
);

export default Notification;
