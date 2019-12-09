module.exports = (dnsZone, domain) => {
  return {
    name: dnsZone.Record.replace(`.${domain}`, "."),
    host: dnsZone.Content
  };
};
