const https = require('https');

const apiController = {
  getMovies: async (req, res) => {
    try {
      const { charId } = req.params;

      const swapiResponse = await https.get(`https://swapi.co/api/people/${charId}/`, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
          data += chunk;
        });
        resp.on('end', () => JSON.parse(data));
      });

      res.json(swapiResponse);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: 'Invalid request' });
    }
  },
};

module.exports = apiController;
