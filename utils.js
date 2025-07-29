const redisClient = require('../config/redisClient');
const Client = require('../models/Client');

module.exports = async function rateLimiter(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  const client = await Client.findOne({ apiKey });

  if (!client) return res.status(401).send('Invalid API Key');

  const key = `usage:${client.clientId}`;
  const usage = await redisClient.incr(key);

  if (usage === 1) await redisClient.expire(key, 86400); // Daily window

  if (usage > client.limit) return res.status(429).send('Rate limit exceeded');
  
  client.usageCount = usage;
  await client.save();

  next();
};
