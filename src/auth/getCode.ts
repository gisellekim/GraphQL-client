import fs from "fs"
import http from "http"
import * as url from "url"
import "cross-fetch/polyfill"
import fetch from "cross-fetch"
import open from "open"
import * as keytar from "keytar"
import FormData from "form-data"

const PORT = 3000

export const getCode = (): Promise<string> => {
  return new Promise((resolve) => {
    fs.readFile("./src/auth/auth.html", (err, html) => {
      console.log(err)
        .createServer(async (req, res) => {
          if (!req.url) {
            return
          }
          const { code } = url.parse(req.url, true).query
          res.writeHead(200, { "content-Type": "text/html" })
          res.write(html)
          res.end()

          const data = new FormData()
          data.append("client_id", process.env.Client_ID)
          data.append("client_secret", process.env.Client_SECRET)
          data.append("code", code)
          data.append("state", "abc")
          data.append("redirect_uri", "http://localhost:3000")
          
          const { access_token } = await fetch(
            "https://github.com/login/oauth/access_token",
            {
              method: "POST",
              body: data,
              headers: {
                Accept: "application/json",
              },
            }
          ).then((res) => res.json())
          await keytar.setPassword("github", process.env.CLIENT_ID!, access_token)
          resolve(access_token)
        })
        .listen(PORT)
    })
  })
  open(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user%20read:org%20public_repo%20admin:enterprise&state=abc`)
}
