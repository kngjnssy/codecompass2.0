fetch('https://api.app.code.berlin/graphql', {
    method: 'POST',
    headers: { 
        "Content-Type": "application/json",
        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjazBvNTkzNXAwNjc2bno3MjRqNTFicjdqIiwiaWF0IjoxNTkzNDU4MzE2LCJleHAiOjE1OTM0NTg5MTYsImF1ZCI6ImNvZGVycyIsImlzcyI6ImNvZGUtaW50cmFuZXQifQ.itEdw3LezvA8SsG_YO1y7cwUVtkXKbRm8F-9dOD7LQ0",

    },
    body: JSON.stringify({
        query: `
            query {
                studyPrograms {
                    name
                }
            }
        `
    }) 
})
.then(res => res.json())
.then(data => {
    console.log(data)
})
console.log('meh')
// fetch('https://countries.trevorblades.com/', {
//     method: 'POST',
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//         query: `
//             query {
//                 continents {
//                     name
//                 }
//             }
//         `
//     }) 
// })
// .then(res => res.json())
// .then(data => { 
//     console.log(data.data)
// })