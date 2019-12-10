const myArgs = process.argv.slice(2);
const csvFilePath = `./input/${myArgs[0]}`;
const zonefile = require("dns-zonefile");
const csv = require("csvtojson");
const fs = require("fs");

// change me
const domain = myArgs[1];

(async () => {
  const jsonArray = await csv().fromFile(csvFilePath);

  // sort records
  const jsonArray1 = await jsonArray.sort(function(a, b) {
    if (a.Record.length < b.Record.length) {
      return -1;
    }
    if (a.Record.length > b.Record.length) {
      return 1;
    }
    return 0;
  });

  const zoneFileJSON = {
    $origin: domain,
    $ttl: 3600,
    ...require("./util/zoneFile")
  };

  await jsonArray1.forEach(dnsZone => {
    // A records
    if (dnsZone["Record Type"] == "A") {
      zoneFileJSON.a.push(require("./util/converter/aRecord")(dnsZone, domain));
    }

    // cnames
    if (dnsZone["Record Type"] == "CNAME") {
      zoneFileJSON.cname.push(
        require("./util/converter/cName")(dnsZone, domain)
      );
    }

    // mx
    if (dnsZone["Record Type"] == "MX") {
      zoneFileJSON.mx.push(require("./util/converter/mx")(dnsZone, domain));
    }

    // txt
    if (dnsZone["Record Type"] == "TXT") {
      zoneFileJSON.txt.push(require("./util/converter/txt")(dnsZone, domain));
    }

    // SRV
    if (dnsZone["Record Type"] == "SRV") {
      zoneFileJSON.srv.push(dnsZone);
    }
    // end
  });
  const output = zonefile.generate(zoneFileJSON);
  // write to sync
  fs.writeFile(`./output/${domain}-zonefile.txt`, output, function(err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was outputted to the outputfile");
  });
})();
