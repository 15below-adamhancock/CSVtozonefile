const dig = require('node-dig-dns')

module.exports = async function (dns, ip) {
    const options = [`@8.8.8.8`, 'a', dns]
    await dig(options).then((res) => {

        if (res.answer.length == 0 || res.answer[0].value !== ip) {
            return true
        } else {
            return false
        }
    })


}