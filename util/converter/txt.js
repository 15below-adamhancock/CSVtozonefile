module.exports = (dnsZone, domain) => {
  return {
    name: dnsZone.Record.replace(`.${domain}`, "."),
    txt: dnsZone.Content
  };
};
