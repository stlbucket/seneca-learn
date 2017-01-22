require('dotenv-safe').load({
  allowEmptyValues: false
});

module.exports = {
  serviceName:  process.env.SERVICE_NAME,
  transportUrl: process.env.TRANSPORT_URL,
  transportType: process.env.TRANSPORT_TYPE,
  servicePin: `role:${process.env.SERVICE_NAME}`
};