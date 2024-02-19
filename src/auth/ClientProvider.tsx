import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import React, { FC, PropsWithChildren } from "react"
import { authFlowLink } from "./authFlowLink"

export const ClientProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const cache = new InMemoryCache({
    typePolicies: {
      User: { merge: true },
    },
  })

  const client = new ApolloClient({
    cache,
    link: authFlowLink,
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
