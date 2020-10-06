(async function () {
    console.log(await require('./util/checkDNS')(`15below-imagelb-abe-int.15belowhosted.net`, '209.235.205.164'))
})()
