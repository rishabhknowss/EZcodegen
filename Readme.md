# EZCode
A cli tool for debugging and generating code 

## Installation

```
npm install ezcode
```
## Setup

To use ezcode, you need to set up your environment by creating a `.env` file with your [Gemini Pro](https://ai.google.dev/) API key:

```dotenv
API_KEY="YOUR_GEMINI_PRO_KEY"
```
## Usage

```
ezcode -f "<filename>" -p "<prompt>"
```
example-
```
ezcode -f "index.js" -p "create a simple express js server"
```
enjoy!