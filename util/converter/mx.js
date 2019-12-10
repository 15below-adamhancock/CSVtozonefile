module.exports = (dnsZone, domain) => {
  return {
    name: dnsZone.Record.replace(`.${domain}`, `.${domain}.`),
    host: dnsZone.Content
  };
};
