import { guild } from "@guildxyz/sdk"
import { useQuery } from "react-query"

const useGuild = (urlName: string) =>
  useQuery(`guild-${urlName}`, () => guild.get(urlName))

export default useGuild
