import { Button, Group, Modal } from "@mantine/core"
import { createContext, PropsWithChildren, useContext, useState } from "react"
import { useConnect, useNetwork } from "wagmi"

const Web3ConnectionContext = createContext({
  isConnectionModalOpen: false,
  openConnectionModal: () => {},
  closeConnectionModal: () => {},
})

const Web3ConnectionProvider = ({
  children,
}: PropsWithChildren<unknown>): JSX.Element => {
  const [
    { data: connectData, error: connectError, loading: connectLoading },
    connect,
  ] = useConnect()
  const [{ data: networkData, error: networkError, loading: networkLoading }] =
    useNetwork()

  const [isConnectionModalOpen, setIsConnectionModalOpen] = useState(false)

  const openConnectionModal = () => setIsConnectionModalOpen(true)
  const closeConnectionModal = () => setIsConnectionModalOpen(false)

  return (
    <Web3ConnectionContext.Provider
      value={{
        isConnectionModalOpen,
        openConnectionModal,
        closeConnectionModal,
      }}
    >
      {children}

      <Modal
        opened={isConnectionModalOpen}
        onClose={closeConnectionModal}
        centered
        size="sm"
        title="Connect to a wallet"
      >
        <Group spacing="sm" direction="column">
          {connectData.connectors.map((connector) => (
            <Button
              key={connector.id}
              variant="default"
              size="lg"
              fullWidth
              disabled={!connector.ready}
              onClick={() => connect(connector)}
            >
              {connector.name}
              {!connector.ready && " (unsupported)"}
            </Button>
          ))}
        </Group>
      </Modal>
    </Web3ConnectionContext.Provider>
  )
}

const useWeb3Connection = () => useContext(Web3ConnectionContext)

export { Web3ConnectionProvider, useWeb3Connection }
