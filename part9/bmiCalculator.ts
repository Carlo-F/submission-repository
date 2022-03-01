const parseArguments = (args: Array<string>) => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
        height: Number(args[2]),
        weight: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

const calculateBmi = (height: number, weight: number): string => {
    const heightInMt = height / 100;
    const bmi = weight / Math.pow(heightInMt, 2);

    if (bmi < 18.5) {
        return 'Grave magrezza';
    } else if (bmi >= 18.5 && bmi < 25) {
        return 'Normopeso';
    } else {
        return 'Sovrappeso';
    }

}

try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    let errorMessage = 'Something gone wrong';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage)
}