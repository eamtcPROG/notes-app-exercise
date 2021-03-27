import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link, Switch, Route } from 'react-router-dom';
import { Text, Flex, Box, Heading, Button } from '@chakra-ui/react';
import DeleteModal from '../components/DeleteModal';

function Note() {
    const params = useParams();
    
    
    const notes = useSelector((state) => state.notes);
    /* if(notes!== null){
        return (
            <Flex w="100%" h="100vh" alignItems="center" justifyContent="center">
              <Text color="red.600">Oops, nu am gasit notita</Text>
            </Flex>
          );
    } */
  // [{title, ref: { value: { id:  } }},{}, {}]
  const selectedNote = notes.find((note) => note._id === params.id);
    console.log(selectedNote);
  if (!selectedNote) {
    return (
      <Flex w="100%" h="100vh" alignItems="center" justifyContent="center">
        <Text color="red.600">Oops, nu am gasit notita</Text>
      </Flex>
    );
  }

  return (
    
    <Box rounded={'lg'}
bg={"white"}
boxShadow={'lg'}
mt="1%"
ml="28%"
mb="1%"
w={"50%"}
p={8}>
    <Flex justifyContent="space-between">
      <Box w="100%">
        <Heading as="h1" pb="36px">
          {selectedNote.title}
        </Heading>

        <Text>{selectedNote.text}</Text>
      </Box>

      <Box w="25%">
        <Link to={`/notes/${selectedNote._id}/edit`}>
          <Button
            backgroundColor="blue.600"
            color="white"
            textAlign="center"
            w="120px"
            display="block"
            mb="16px"
          >
            Edit
          </Button>
        </Link>
        <Link to={`/notes/${selectedNote._id}/delete`}>
          <Button
            backgroundColor="red.600"
            color="white"
            textAlign="center"
            w="120px"
            display="block"
            mb="16px"
          >
            Delete
          </Button>
        </Link>
      </Box>
      <Switch>
        <Route path="/notes/:id/delete" component={DeleteModal} />
      </Switch>
    </Flex>
    </Box>
  );
}

export default Note;