import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    try {
        res.json({height,weight,bmi: calculateBmi(height, weight)});
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.json({ error: err.message });        
        }
    }    
});

app.post('/exercises', (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { daily_exercises, target } = req.body;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        if (!daily_exercises || !target) {
            throw new Error('parameters missing');
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        } else if(typeof daily_exercises !== 'object' || isNaN(target)){
            throw new Error('malformatted parameters');
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        res.json(calculateExercises(daily_exercises, target));
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.json({ error: err.message });        
        }
    }
});

const PORT = 3003;

app.listen(PORT)
    .on('listening', () => {
        console.log(`Server is running on port ${PORT}`);
    })
    .on('error', (err) => {
    console.log('an error occured', err.message);
    });