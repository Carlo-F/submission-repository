import express from 'express';
import calculateBmi from './bmiCalculator';

const app = express();

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

const PORT = 3003;

app.listen(PORT)
    .on('listening', () => {
        console.log(`Server is running on port ${PORT}`);
    })
    .on('error', (err) => {
    console.log('an error occured', err.message);
    });