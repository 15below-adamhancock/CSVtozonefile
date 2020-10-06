const axios = require('axios')

module.exports = async function (dns, ip) {
    return axios.get(`https://dns.techops.15below.local/dig?domain=${dns}&server=8.8.8.8&type=f`).then((res) => {
        if (res.data.length == 0 || res.data[0].value !== ip) {
            return true
        } else {
            return false
        }
    })


}