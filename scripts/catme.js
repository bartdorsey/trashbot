// Description:
//   Prints a random cat to the channel
//
// Commands:
//   hubot catme -- Prints a random cat to the channel
const fetch = require('node-fetch');

module.exports = robot => {
    robot.respond(/catme/i, async res => {
        try {
            const response = await fetch(
              `https://api.thecatapi.com/v1/images/search`
            );
            if (response.ok) {
                const catInfo = await response.json();
                if (catInfo[0] && catInfo[0].url) {
                  res.send(catInfo[0].url);
                } else {
                    throw new Error(`Couldn't fetch a cat`);
                }
            }
        } catch (e) {
            res.send(`Whoops, I couldn't get a cat.`);
            console.error(e);
        }
    });
}
