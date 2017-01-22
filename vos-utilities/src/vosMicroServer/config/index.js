const expectedEnvironment = [
  'SERVICE_NAME',
  'TRANSPORT_TYPE',
  'TRANSPORT_URL',
];

expectedEnvironment.forEach(
  name => {
    if (typeof process.env[name] !== 'string') {
      throw new Error(`MISSING ENVIRONMENT VARIABLE:  ${name}`)
    }
  }
);

module.exports = (serviceConfig) => {
  return Object.assign({
    serviceName: process.env.SERVICE_NAME,
    transportType: process.env.TRANSPORT_TYPE,
    transportUrl: process.env.TRANSPORT_URL,
    servicePin: `role:${process.env.SERVICE_NAME}`
  }, serviceConfig || {});
};