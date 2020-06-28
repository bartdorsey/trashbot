// Description:
//   Prints a random pug to the channel
//
// Commands:
//   hubot pugme - Prints a random pug to the channel
const fetch = require('node-fetch');

module.exports = robot => {
    robot.respond(/dogme (\w+)/i, async res => {
        const breed = res.match[1];
        try {
            const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
            if (response.ok) {
                const pug = await response.json();
                if (pug.status === 'success') {
                    res.send(pug.message);
                } else {
                    throw new Error(`Couldn't fetch a ${breed}`);
                }
            }
        } catch (e) {
            res.send(`Whoops, I couldn't get a ${breed}.`);
            console.error(e);
        }
    });
}