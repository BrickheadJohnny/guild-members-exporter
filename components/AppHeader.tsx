import { Box, Button, Group, Title } from "@mantine/core"
import { useAccount } from "wagmi"
import shortenHex from "../utils/shortenHex"
import { useWeb3Connection } from "./Web3ConnectionContext"

const AppHeader = (): JSX.Element => {
  const [{ data: accountData, loading: accountLoading }] = useAccount()

  const { openConnectionModal } = useWeb3Connection()

  return (
    <Group position="apart" spacing="md">
      <Title order={1}>Guild Members Exporter</Title>
      {accountData?.address ? (
        <Box
          sx={(theme) => ({
            paddingInline: theme.spacing.lg,
            backgroundColor: theme.colors.gray[8],
            height: 36,
            borderRadius: theme.radius.sm,
            fontSize: theme.fontSizes.sm,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
          })}
        >
          {shortenHex(accountData.address, 3)}
        </Box>
      ) : (
        <Button loading={accountLoading} onClick={openConnectionModal}>
          {accountLoading ? "Loading" : "Connect wallet"}
        </Button>
      )}
    </Group>
  )
}

export default AppHeader
