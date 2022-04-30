import { guild } from "@guildxyz/sdk"
import { useQuery } from "react-query"
import { useAccount } from "wagmi"

const fetchMyGuilds = (address: string) =>
  guild.getByAddress(address, "admin").catch((_) => [])

const useMyGuilds = () => {
  const [{ data: accountData }] = useAccount()

  return useQuery(`${accountData?.address}-guilds`, () =>
    fetchMyGuilds(accountData?.address)
  )
}

export default useMyGuilds
