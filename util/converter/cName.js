module.exports = (dnsZone, domain) => {
  return {
    name: dnsZone.Record.replace(`.${domain}`, "."),
    alias: dnsZone.Content
  };
};
