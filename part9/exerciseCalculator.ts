interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (period: Array<number>, daily_target: number): Result => {

    const average = period.reduce((prev, curr) => prev + curr, 0)/period.length;
    const target_diff = average - daily_target;
    let rating = 2;
    let rating_description = '';

    if (target_diff > 0) {
        rating = 3;
        rating_description = 'Very Good!';
    } else if (target_diff === 0) {
        rating = 2;
        rating_description = 'Good job';
    } else {
        rating = 1;
        rating_description = 'Target not achieved';
    }
   
    return {
        periodLength: period.length,
        trainingDays: period.filter(number => number > 0).length,
        success: average >= daily_target,
        rating: rating,
        ratingDescription: rating_description,
        target: daily_target,
        average: average
    }
}

console.log(calculateExercises([3, 1, 2, 4.5, 0, 3, 1], 2));