module.exports = (dnsZone, domain) => {
  return {
    name: dnsZone.Record.replace(`.${domain}`, `.${domain}.`) + `.${domain}.`,
    ip: dnsZone.Content
  };
};
