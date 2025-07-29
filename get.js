router.get('/usage/:clientId', async (req, res) => {
  const client = await Client.findOne({ clientId: req.params.clientId });
  if (!client) return res.status(404).send('Client not found');
  res.json({ usage: client.usageCount, limit: client.limit });
});
