export const assertNever = (value: never): never => {
    throw new Error(`Unhandled entry case: ${JSON.stringify(value)}`);
};