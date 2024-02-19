import React, { useEffect, useRef } from "react"
import { gql, useQuery } from "@apollo/client"
import open from "open"
import { listRepositories } from "./types/listRepositories"
import { Panel } from "../shared/Panel"
import { Text } from "../shared/Text"
import { List } from "../shared/List"

const LIST_REPOSITORIES = gql`
  query listRepositories {
    viewer {
      repositories(first: 100) {
        nodes {
          name
          url
        }
      }
    }
  }
`

export const RepositoriesList = () => {
  const { loading, error, data } = useQuery<listRepositories>(LIST_REPOSITORIES)
  const listRef = useRef<any>()
  const repos = data?.viewer.repositories.nodes

  useEffect(() => {
    listRef?.current?.focus()
  }, [data])

  if (loading) {
    return (
      <Panel height={10} top="25%" left="center">
        <Text left="center">Loading...</Text>
      </Panel>
    )
  }

  if (error) {
    return <>Error: {JSON.stringify(error)}</>
  }

  return (
    <Panel height={10} top="25%" left="center">
      <Text left="center">List Repositories</Text>
      <List
        ref={listRef}
        top={2}
        onAction={(el) =>
          open(repos?.find((repo) => repo?.name === el.content)?.url || "")
        }
        items={repos?.map((repo) => repo?.name || "") || []}
      />
    </Panel>
  )
}
