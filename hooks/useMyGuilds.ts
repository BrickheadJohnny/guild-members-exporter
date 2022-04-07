import { guild, user } from "@guildxyz/sdk"
import { useQuery } from "react-query"
import { useAccount } from "wagmi"

const fetchMyGuilds = (address: string) =>
  user
    .getMemberships(address)
    .then((memberships) =>
      memberships
        .map((membership) => membership.guildId)
        .filter((guildId) => !!guildId)
    )
    .then((myGuildIds) =>
      guild
        .getAll()
        .then((guilds) => guilds.filter((g) => myGuildIds.includes(g.id)))
    )
    .catch((_) => [])

const useMyGuilds = () => {
  const [{ data: accountData }] = useAccount()

  return useQuery(`${accountData?.address}-guilds`, () =>
    fetchMyGuilds(accountData?.address)
  )
}

export default useMyGuilds
