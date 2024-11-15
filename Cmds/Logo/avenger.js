const fetch = require('node-fetch');

module.exports = async (context) => {
    const { client, m, text, botname } = context;

    // Check if the text includes the '|' separator
    if (!text.includes('|')) {
        return m.reply("Example Usage: * .avenger Keith|Tech");
    }

    try {
        // Split the input text into two parts based on '|'
        const [text1, text2] = text.split('|').map(part => part.trim());

        // Ensure both parts are provided
        if (!text1 || !text2) {
            return m.reply("Please provide two arguments separated by '|'. Example: * .avenger Keith|Tech");
        }

        // Example API that accepts query parameters to create a logo
        // Replace this URL with the correct API endpoint if available
        const apiUrl = `https://api.example.com/create-logo?text1=${encodeURIComponent(text1)}&text2=${encodeURIComponent(text2)}`;

        // Fetch the image data from the API
        const response = await fetch(apiUrl);

        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // The API might return an image as a direct response or a URL to an image
        const imageBuffer = await response.buffer();

        // Send the image as a message
        await client.sendMessage(m.chat, {
            image: imageBuffer,
            caption: `Logo created for ${text1} & ${text2} by ${botname}`,
        }, { quoted: m });

    } catch (error) {
        // Handle any errors that occur during the process
        console.error(error);
        m.reply(`An error occurred: ${error.message}. The API might be down or there was an issue with the request.`);
    }
};
