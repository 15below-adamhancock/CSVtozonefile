const myArgs = process.argv.slice(2);
const csvFilePath = `./input/${myArgs[0]}`;
const zonefile = require("dns-zonefile");
const csv = require("csvtojson");
const fs = require("fs");
const checkDNS = require('./util/checkDNS')

// change me
const domain = myArgs[1];

(async () => {
  const jsonArray = await csv().fromFile(csvFilePath);

  // sort records by length to allow parent zones to be created first.
  const jsonArray1 = await jsonArray.sort(function (a, b) {
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
  for await (dnsZone of jsonArray1) {

    const dnsExists = await checkDNS(`${dnsZone.Record}.${domain}`, dnsZone.Content)
    // check DNS doesn't exist 
    if (dnsExists) {
      console.log(`Adding ${dnsZone.Record}.${domain}`)
      // A records
      if (dnsZone["Record Type"] == "A") {
        await zoneFileJSON.a.push(require("./util/converter/aRecord")(dnsZone, domain));
      }

      // cnames
      if (dnsZone["Record Type"] == "CNAME") {
        await zoneFileJSON.cname.push(
          require("./util/converter/cName")(dnsZone, domain)
        );
      }

      // mx
      if (dnsZone["Record Type"] == "MX") {
        await zoneFileJSON.mx.push(require("./util/converter/mx")(dnsZone, domain));
      }

      // txt
      if (dnsZone["Record Type"] == "TXT") {
        await zoneFileJSON.txt.push(require("./util/converter/txt")(dnsZone, domain));
      }

      // SRV
      // if (dnsZone["Record Type"] == "SRV") {
      //   zoneFileJSON.srv.push(dnsZone);
      // }
      // end
    } else {
      console.log(`${dnsZone.Record}.${domain} exists already`)
    }
  };
  const output = zonefile.generate(zoneFileJSON);
  // write to sync
  fs.writeFile(`./output/${domain}-zonefile.txt`, output, function (err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was outputted to the outputfile");
  });
})();
