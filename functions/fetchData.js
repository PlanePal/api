const fs = require('fs');

exports.handler = async (event, context) => {
    try {
        const data = fs.readFileSync('./api/data.json', 'utf8');
        return {
            statusCode: 200,
            body: data,
        };
    } catch (error) {
        console.error('Error reading data:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error reading data', error: error.message }),
        };
    }
};
