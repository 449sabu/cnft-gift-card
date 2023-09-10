import { Flex, Select, Text } from '@radix-ui/themes';

const SelectRules = () => {
  return (
    <div>
      <Flex direction="column" gap="3">
        <Text size="2" weight="bold" align="left">
          3, 償還時の追加条件の選択
        </Text>
        <Select.Root>
          <Select.Trigger placeholder="Select a fruit…" />
          <Select.Content>
            <Select.Item value="no-roles">No Roles</Select.Item>
            <Select.Separator />
            <Select.Group>
              <Select.Label>SPO</Select.Label>
              <Select.Item value="carrot">Specific Period</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
        <Text size="1" align="left">
          「No Roles」を選択すると、追加条件なく CNFT の保有者が ADA を償還できます。
        </Text>
      </Flex>
    </div>
  );
};

export default SelectRules;
