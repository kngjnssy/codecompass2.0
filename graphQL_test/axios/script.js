
const axios = require('axios');
console.log('naaaaa')

async function makeRequest() {

    const config = {
        url: 'https://countries.trevorblades.com/',
        method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: `
                    query {
                        continents {
                            name
                        }
                    }
                `
            })     }

    let res = await axios(config)

    console.log(res);
}

makeRequest();