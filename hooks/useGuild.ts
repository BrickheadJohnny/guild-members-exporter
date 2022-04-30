import { guild } from "@guildxyz/sdk"
import { useRouter } from "next/router"
import { useQuery } from "react-query"

const useGuild = () => {
  const { query } = useRouter()
  const urlName = query.guild?.toString()

  return useQuery(`guild-${urlName}`, () => guild.get(urlName))
}

export default useGuild
