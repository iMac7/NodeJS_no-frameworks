const http = require("http")
const url = require("url")
const { StringDecoder } = require("node:string_decoder")

const server = http.createServer((req, res) => {
  // Parse the request containing URL
  const parsedUrl = url.parse(req.url, true)

  const path = parsedUrl.pathname
  //removes extra slashes from the path
  const trimmedPath = path.replace(/^\/+|\/+$/g, "")

  //request method
  const method = req.method.toLowerCase()

  //get request headers as an object
  const headers = req.headers

  //query string
  const queryString = parsedUrl.query

  // get payload, utf8 for JSON
  const decoder = new StringDecoder("utf-8")
  const buffer = ""
  //the request object emits an event 'data' when it is receiving data. the decoder parses it and adds the data
  req.on("data", function (data) {
    buffer += decoder.write(data)
  })

  console.log(headers)

  res.statusCode = 200
  res.setHeader("Content-Type", "text/plain")
  res.end("Hello World\n")
})

server.listen(3000, function () {
  console.log("Server listening on port 3000")
})
