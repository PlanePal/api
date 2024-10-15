const fs = require('fs');

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    const { serverCount, memberCount } = JSON.parse(event.body);

    const data = {
        serverCount,
        memberCount,
    };

    try {
        // Save data to data.json
        fs.writeFileSync('./data.json', JSON.stringify(data, null, 2));
        
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Data updated successfully!', data }),
        };
    } catch (error) {
        console.error('Error updating data:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error updating data', error: error.message }),
        };
    }
};
