'use client';
import { Flex, Grid, RadioGroup, Text } from '@radix-ui/themes';

const Settings = () => {
  return (
    <Grid columns="2">
      <Flex direction="column" gap="4">
        <Text>ネットワーク</Text>
        <RadioGroup.Root defaultValue="3">
          <Flex gap="3" direction="row">
            <label>
              <Flex gap="2" align="center">
                <RadioGroup.Item value="1" disabled />
                <Text size="2">Mainnet</Text>
              </Flex>
            </label>
            <label>
              <Flex gap="2" align="center">
                <RadioGroup.Item value="2" disabled />
                <Text size="2">PreProd Testnet</Text>
              </Flex>
            </label>
            <label>
              <Flex gap="2" align="center">
                <RadioGroup.Item value="3" />
                <Text size="2">Preview Testnet</Text>
              </Flex>
            </label>
          </Flex>
        </RadioGroup.Root>
      </Flex>
    </Grid>
  );
};

export default Settings;
