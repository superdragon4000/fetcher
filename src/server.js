const express = require("express");
const app = express()
const port = 3001

const { fetcher } = require('./fetcher.js');

/*
    TODO: краулер страницы
    POST http://localhost:3000/parse
    body: { domainName: string}
    return string[]
*/
var init = 'https://test.com/f'
var col = new Set();
function getUrls(url) {
    let data = '';
    fetcher(url)
        .then((value) => { return value.text() })
        .then((value) => {
            data = value
            let i = 0
            while (i < data.length) {
                if (data[i] !== '<') {
                    i++
                    continue
                }
                let substring = data.substring(i + 1, i + 9)
                if (substring != 'a href="') {
                    i++
                    continue
                }
                i += 9
                var stringBuilder = '';
                var char = data[i]
                while (char != '"') {
                    stringBuilder += char
                    char = data[++i]
                }
                col.add(stringBuilder)
                i += 5
            }
            console.log(col)
        })
}
getUrls(init)



app.get('/', (req, res) => {




    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})