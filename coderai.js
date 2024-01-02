#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const cli = require('cli');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function generateCode(fileContent, prompt) {
    const defaultPrompt = "You are writing into the file so make the code go to production, no unnecessary comments. Keep the latest configurations.";
    const combinedPrompt = `${fileContent}\n${defaultPrompt}\n${prompt}`;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(combinedPrompt);
    const response = await result.response;
    return response.text();
}

async function generateCodeFromFile(filename, prompt) {
    try {
        const fileContent = fs.readFileSync(filename, 'utf-8');
        const generatedCode = await generateCode(fileContent, prompt);
        return generatedCode;
    } catch (error) {
        throw new Error(`Error reading file '${filename}': ${error.message}`);
    }
}

function writeToFile(filename, content) {
    fs.writeFileSync(filename, content, 'utf-8');
    cli.ok(`Code written to '${filename}' successfully.`);
}

cli.parse({
    filename: ['f', 'File to process', 'file'],
    prompt: ['p', 'Prompt for code generation', 'string'],
});

cli.main(async function (args, options) {
    const { filename, prompt } = options;

    try {
        if (filename && prompt) {
            // If both a filename and a prompt are provided, generate code based on the content of the file and the prompt
            const generatedCode = await generateCodeFromFile(filename, prompt);

            // Write the generated code to the specified file
            writeToFile(filename, generatedCode);
        } else {
            // Display help if no options are provided
            cli.getUsage();
        }
    } catch (error) {
        cli.error('Error:', error.message);
    }
});
