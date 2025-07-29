const Client = require('../models/Client');

exports.handleWebhook = async (event) => {
  const metadata = event.data.object.metadata;
  const clientId = metadata.clientId;
  const plan = metadata.plan;

  const planLimits = { free: 1000, pro: 10000, enterprise: 100000 };
  await Client.updateOne({ clientId }, { plan, limit: planLimits[plan] });
};

router.post('/webhook/stripe', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    await billingService.handleWebhook(event);
    res.sendStatus(200);
  } catch (err) {
    console.error('Webhook Error:', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});
