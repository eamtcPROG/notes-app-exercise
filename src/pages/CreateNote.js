import React from 'react';
import {
    Box,
    Heading,
    useColorModeValue,
  } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import { createNoteAction } from '../actions/notesActions';
import { useHistory } from 'react-router-dom';
import NoteForm from '../components/NoteForm';

function CreateNote() {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmitCallback = (note) => {
    dispatch(createNoteAction(note)).then(() => {
      history.push('/');
    });
  };

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
      <Heading as="h1" pb="36px">
        Creeaza o notita!
      </Heading>

      <NoteForm onSubmitCallback={onSubmitCallback} />
    </Box>
    </div>
  );
}

export default CreateNote;