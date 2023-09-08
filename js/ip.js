const http = require('http');
const fs = require('fs');
const { promisify } = require('util');

const appendFileAsync = promisify(fs.appendFile);

const server = http.createServer(async (req, res) => {
    const userIP = req.connection.remoteAddress;
    
    // Extract the IPv4 address from the IPv4-mapped IPv6 address
    const ipv4Address = userIP.replace(/^.*:/, '');

    // Log the IPv4 address to a file
    const logMessage = `User IPv4 Address: ${ipv4Address}\n`;
    
    try {
        await appendFileAsync('ip_logs.txt', logMessage);
        console.log('User IP corrected', logMessage);
    } catch (err) {
        console.error('Error writing to log file:', err);
    }

    res.end('Thanks for using SmartSpecs:)\n');
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
