// functions/updateData.js

const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
    const dataFilePath = path.join(__dirname, '../data.json');

    try {
        const requestBody = JSON.parse(event.body);
        const updatedData = {
            serverCount: requestBody.serverCount,
            memberCount: requestBody.memberCount,
        };

        fs.writeFileSync(dataFilePath, JSON.stringify(updatedData, null, 2));
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Data updated successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to update data' }),
        };
    }
};