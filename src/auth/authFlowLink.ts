import { setContext } from "@apollo/client/link/context"
import { onError } from "@apollo/client/link/error"
import { ServerError } from "@apollo/client"
import { RetryLink } from "@apollo/client/link/retry"
import { HttpLink, from } from "@apollo/client"
import * as keytar from "keytar"
import { getCode } from "./getCode"

// this is where I am going to make all the requests
const GITHUB_BASE_URL = "https://api.gitgub.com/graphql"

// this is responsible for actually making the requests
const httpLink = new HttpLink({ uri: GITHUB_BASE_URL })

// cached storage for the user token
let token: string | null
let tokenInvalid = false

// token middleware
const withToken = setContext(async (_, { headers = {} }) => {
  if (token) return { token }

  if (tokenInvalid) {
    token = await getCode()
    tokenInvalid = false
  } else {
    token =
      (await keytar.getPassword("github", process.env.CLIENT_ID!)) ||
      (await getCode())
  }

  return { token }
})

// auth bearer middleware
const withAuthBearer = setContext(async (_, { headers = {}, token }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  }
})

// reset token middleware -> engancing security
const resetToken = onError(({ networkError }) => {
  // when the user is  unauthorised or token is expired (it happens when user logged out or session is expired)
  if ((networkError as ServerError)?.statusCode === 401 && !!token) {
    token = null
    tokenInvalid = true
  }
})

const retry = new RetryLink({
  delay: {
    initial: 300,
    max: Infinity,
    jitter: true,
  },
})

export const authFlowLink = from([
  retry,
  resetToken,
  withToken,
  withAuthBearer,
  httpLink,
])
