import express from "express";
import { spawn } from "child_process";
const app = express.Router();

const executePython = async (script, args) => {
    const pythonArgs = args.map(arg => arg.toString());

    const py = spawn("python", [script, ...pythonArgs]);

    const result = await new Promise((resolve, reject) => {
        let output = '';

        py.stdout.on('data', (data) => {
            output += data.toString();
        });

        py.stderr.on("data", (data) => {
            console.error(`[python] Error occurred: ${data}`);
            reject(`Error occurred in ${script}: ${data.toString()}`);
        });

        py.on("exit", (code) => {
            if (code !== 0) {
                reject(`Python script exited with code ${code}`);
            } else {
                resolve(output);
            }
        });
    });

    return JSON.parse(result);
};

//Route of the bad word detecting feature
app.post('/predict', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        const result = await executePython('scripts/predict.py', [message]);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

export default app;