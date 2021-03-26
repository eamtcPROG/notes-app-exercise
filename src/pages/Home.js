import React from 'react';
import { Heading, Text,Box ,useColorModeValue} from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import NoteCard from '../components/NoteCard';

function Home() {
const { notes, loading } = useSelector((state) => ({
    notes: state.notes,
    loading: state.loading,
  }));

  return (
    <div>
      <Box rounded={'lg'}
bg={useColorModeValue('white', 'gray.700')}
boxShadow={'lg'}
mt="1%"
ml="28%"
mb="1%"
w={"50%"}
p={8}>
      <Heading as="h1" paddingBottom="36px">
        Notitile mele
      </Heading>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        notes.map((note) => <NoteCard note={note} />)
      )}
    </Box>

    </div>
  );
}


export default Home;