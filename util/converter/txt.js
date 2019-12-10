module.exports = (dnsZone, domain) => {
  return {
    name: dnsZone.Record.replace(`.${domain}`, `.${domain}.`),
    txt: dnsZone.Content
  };
};
