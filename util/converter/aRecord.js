module.exports = (dnsZone, domain) => {
  return {
    name: dnsZone.Record.replace(`.${domain}`, "."),
    ip: dnsZone.Content
  };
};
