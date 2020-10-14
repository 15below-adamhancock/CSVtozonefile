module.exports = (dnsZone, domain) => {
  return {
    name: dnsZone.Record + `.`,
    ip: dnsZone.Content
  };
};
