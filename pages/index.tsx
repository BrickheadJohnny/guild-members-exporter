import { Card, SimpleGrid, Text } from "@mantine/core"
import type { NextPage } from "next"
import Link from "next/link"
import useMyGuilds from "../hooks/useMyGuilds"

const Home: NextPage = () => {
  const { data, isLoading, error } = useMyGuilds()

  return (
    <SimpleGrid
      my={28}
      breakpoints={[
        { maxWidth: "xs", cols: 1 },
        { minWidth: "xs", cols: 2 },
      ]}
    >
      {isLoading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>An error occurred</Text>
      ) : data?.length ? (
        data?.map((guild) => (
          <Link key={guild.id} href={`/${guild.urlName}`} passHref>
            <Card
              component="a"
              shadow="sm"
              p="lg"
              sx={(theme) => ({
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "none",
                  backgroundColor: theme.colors.gray[8],
                },
              })}
            >
              {guild.name}
            </Card>
          </Link>
        ))
      ) : (
        <Text>Seems like you haven't joined a guild yet.</Text>
      )}
    </SimpleGrid>
  )
}

export default Home
