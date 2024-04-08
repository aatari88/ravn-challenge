import { gql, useQuery } from '@apollo/client';
import { TextInput, Button, Stack, Skeleton, Center, Box } from '@mantine/core';
import moment from 'moment';
import { Link } from 'react-router-dom';

interface UserProfile {
  fullName: string;
  email: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserProfileData {
  profile: UserProfile;
}

const GET_PROFILE = gql`
  query Profile {
    profile {
      fullName
      email
      type
      createdAt
      updatedAt
    }
  }
`;

const Settings: React.FC = () => {
  const { loading, data } = useQuery<UserProfileData>(GET_PROFILE);

  if (loading) {
  return (
    <Box w={1108}>
      <Center>
        <Stack w={500}>
          <Skeleton height={30} />
          <Skeleton height={30} />
          <Skeleton height={30} />
          <Skeleton height={30} />
          <Skeleton height={30} />
        </Stack>
      </Center>
    </Box>
    );
  }

  return (
    <Box w={1108}>
      <Center>
        <Stack w={500}>
          <TextInput
            label="Full Name"
            name="fullName"
            defaultValue={data?.profile.fullName}
          />
          <TextInput
            label="Email"
            name="email"
            defaultValue={data?.profile.email}
          />
          <TextInput
            label="Type"
            name="type"
            defaultValue={data?.profile.type}
          />
          <TextInput
            label="Created At"
            name="createdAt"
            defaultValue={moment(data?.profile.createdAt).format('DD MMMM, YYYY')}
          />
          <TextInput
            label="Updated At"
            name="updatedAt"
            defaultValue={moment(data?.profile.updatedAt).format('DD MMMM, YYYY')}
          />
        </Stack>
      </Center>
      <Center mt={50}>
        <Stack w={500} justify="flex-end">
          <Button variant="light" color="red" component={Link} to="/">Return</Button>
        </Stack>
      </Center>
    </Box>
  );
};

export default Settings;
