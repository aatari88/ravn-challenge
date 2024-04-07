import { Group, Text } from '@mantine/core';
import classes from './Tag.module.css';

interface PropTypes {
  tags: string[];
}

// console.log(classes);

const Tag: React.FC<PropTypes> = ({ tags }) => (
  <Group gap={8}>
    {tags.map((tag) => (
      <Group key={tag} h="32px" className={classes[tag]} px={12} style={{ borderRadius: '4px' }}>
        <Text size="15px" fw={600}>{tag}</Text>
      </Group>
    ))}
  </Group>
);

export default Tag;
