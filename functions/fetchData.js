// functions/fetchData.js

const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
    const dataFilePath = path.join(__dirname, '../data.json');

    try {
        const data = fs.readFileSync(dataFilePath);
        return {
            statusCode: 200,
            body: data.toString(),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch data' }),
        };
    }
};