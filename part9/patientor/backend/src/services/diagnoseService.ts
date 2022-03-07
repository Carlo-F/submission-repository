import diagnoseEntries from '../../data/diagnoses';

import { diagnoseEntry } from '../types';

const getEntries = (): Array<diagnoseEntry> => {
    return diagnoseEntries;
};

export default {
    getEntries
};