import { Anchor, Text } from "@mantine/core"

const AppFooter = (): JSX.Element => (
  <Text align="center">
    Feel free to fork or contribute! •{" "}
    <Anchor
      href="https://github.com/BrickheadJohnny/guild-members-exporter"
      target="_blank"
    >
      Github
    </Anchor>
  </Text>
)

export default AppFooter
