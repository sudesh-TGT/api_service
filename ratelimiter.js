if (usage > client.limit) {
  // Add alert system: send email/log
  console.warn(`Client ${client.clientId} exceeded limit`);
  return res.status(429).send('Rate limit exceeded');
}
