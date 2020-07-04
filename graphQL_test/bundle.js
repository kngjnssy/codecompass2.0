(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
fetch('https://api.app.code.berlin/graphql', {
    method: 'POST',
    headers: { 
        "Content-Type": "application/json",
        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjazBvNTkzNXAwNjc2bno3MjRqNTFicjdqIiwiaWF0IjoxNTkzNDUzMjQxLCJleHAiOjE1OTM0NTM4NDEsImF1ZCI6ImNvZGVycyIsImlzcyI6ImNvZGUtaW50cmFuZXQifQ.iTe0sRAyNFhfI4OoqhzTSK6GMXmk3XURFAhbhNgsYl4",
        "Access-Control-Allow-Origin": "https://app.code.berlin/",
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
},{}]},{},[1]);
