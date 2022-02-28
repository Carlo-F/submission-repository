
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

console.log(calculateBmi(180, 74));