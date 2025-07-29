const crypto = require('crypto');
const Client = require('../models/Client');

exports.generateKey = async (clientId) => {
  const apiKey = crypto.randomBytes(20).toString('hex');
  const client = new Client({ clientId, apiKey });
  await client.save();
  return apiKey;
};

exports.validateKey = async (apiKey) => {
  return await Client.findOne({ apiKey });
};

router.post('/generate-key', async (req, res) => {
  const { clientId } = req.body;
  const apiKey = await keyService.generateKey(clientId);
  res.json({ apiKey });
});
