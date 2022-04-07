import {
  Alert,
  Badge,
  Box,
  Card,
  Grid,
  Group,
  Image,
  Loader,
  Title,
} from "@mantine/core"
import type { NextPage } from "next"
import Link from "next/link"
import { useAccount } from "wagmi"
import useMyGuilds from "../hooks/useMyGuilds"

const Home: NextPage = () => {
  const [{ data: accountData }] = useAccount()
  const { data, isLoading, error } = useMyGuilds()

  return (
    <Grid my={28} columns={2}>
      {!accountData?.address ? (
        <Grid.Col span={2}>
          <Alert title="Please connect your wallet" color="red">
            Please connect your wallet so we can list your guilds.
          </Alert>
        </Grid.Col>
      ) : isLoading ? (
        <Grid.Col
          span={2}
          style={{ display: "flex", justifyContent: "center", paddingTop: 20 }}
        >
          <Loader />
        </Grid.Col>
      ) : error ? (
        <Grid.Col span={2}>
          <Alert title="Uh-oh!" color="red">
            Unfortunately we couldn't fetch your guilds right now.
          </Alert>
        </Grid.Col>
      ) : data?.length ? (
        data?.map((guild) => (
          <Grid.Col span={1} key={guild.id}>
            <Link href={`/${guild.urlName}`} passHref>
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
                <Group spacing={20} noWrap>
                  <Box
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 40,
                      height: 40,
                      borderRadius: "100%",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={
                        guild.imageUrl?.startsWith("https")
                          ? guild.imageUrl
                          : `https://guild.xyz${guild.imageUrl}`
                      }
                      alt={guild.name}
                      width={guild.imageUrl?.startsWith("https") ? 40 : 20}
                      height={guild.imageUrl?.startsWith("https") ? 40 : 20}
                      fit={guild.imageUrl?.startsWith("https") ? "cover" : undefined}
                    />
                  </Box>
                  <Group
                    direction="column"
                    spacing={8}
                    style={{
                      maxWidth: "calc(100% - 60px)",
                    }}
                  >
                    <Title
                      order={2}
                      sx={(theme) => ({
                        maxWidth: "100%",
                        fontSize: theme.fontSizes.lg,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      })}
                    >
                      {guild.name}
                    </Title>
                    <Badge size="sm" color="dark">{`${guild.memberCount} member${
                      guild.memberCount > 1 ? "s" : ""
                    }`}</Badge>
                  </Group>
                </Group>
              </Card>
            </Link>
          </Grid.Col>
        ))
      ) : (
        <Grid.Col span={2}>
          <Alert title="Hmmm!">Seems like you haven't joined a guild yet.</Alert>
        </Grid.Col>
      )}
    </Grid>
  )
}

export default Home
