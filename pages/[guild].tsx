import {
  Badge,
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Group,
  Text,
  Title,
} from "@mantine/core"
import { useClipboard } from "@mantine/hooks"
import { showNotification } from "@mantine/notifications"
import type { NextPage } from "next"
import { useMemo, useState } from "react"
import useGuild from "../hooks/useGuild"

const GuildPage: NextPage = () => {
  const { data, isLoading, error } = useGuild()
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])

  const clipboard = useClipboard({ timeout: 500 })

  const copyMembersToClipboard = () => {
    clipboard.copy(membersList?.join("\n"))
    showNotification({
      title: "Yay!",
      message: `${membersList?.length} addresses copied to clipboard`,
    })
  }

  const membersList = useMemo(() => {
    const mappedMembers = data?.roles
      ?.filter((role) => selectedRoles.includes(role.id.toString()))
      ?.map((role) => role.members)
      ?.reduce((a, b) => a.concat(b), [])
      ?.filter((member) => !!member)

    // Returning only unique members
    return [...new Set(mappedMembers)]
  }, [selectedRoles])

  const exportMembersAsCsv = () => {
    const csvContent = "data:text/csv;charset=utf-8," + membersList?.join("\n")
    const encodedUri = encodeURI(csvContent)
    window.open(encodedUri, "_blank")
  }

  return (
    <Box my={28}>
      <Title order={2} mb={20}>
        {isLoading ? "Loading..." : error ? "Uh-oh!" : data?.name}
      </Title>
      <CheckboxGroup
        mb={20}
        value={selectedRoles}
        onChange={setSelectedRoles}
        label="Select the members lists you'd like to export"
        required
        orientation="vertical"
        spacing="xs"
      >
        {data?.roles?.map((role) => (
          <Checkbox
            key={role.id}
            value={role.id.toString()}
            label={
              <Group>
                <Text>{role.name}</Text>
                <Badge color="gray">{`${role.members?.length ?? 0} members`}</Badge>
              </Group>
            }
          />
        ))}
      </CheckboxGroup>
      <Group spacing={10}>
        <Button disabled={!selectedRoles.length} onClick={copyMembersToClipboard}>
          {`Copy ${membersList?.length ?? 0} members to clipboard`}
        </Button>
        <Button disabled={!selectedRoles.length} onClick={exportMembersAsCsv}>
          {`Export ${membersList?.length ?? 0} members (.csv)`}
        </Button>
      </Group>
    </Box>
  )
}

export default GuildPage
