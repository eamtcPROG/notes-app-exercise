import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import {
    Box,
    Heading,
    Text
  } from '@chakra-ui/react';
import NoteForm from '../components/NoteForm';
import { editNoteAction } from "../actions/notesActions";

function EditNote(props) {
  
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  
 /*  if(notes!== null){
    return (
        <Flex w="100%" h="100vh" alignItems="center" justifyContent="center">
          <Text color="red.600">Oops, nu am gasit notita</Text>
        </Flex>
      ); */
//}

 
  const notes = useSelector((state) => state.notes);
  console.log(notes)
  const selectedNote =  notes.find((note) => note._id === params.id);
  


  const onSubmitCallback = (note) => {
    const note_id = selectedNote._id;
    dispatch(editNoteAction(note_id, note)).then(() => {
      history.push('/');
    });
  };

  const secondaryButtonClickAction = (e) => {
    history.goBack();
  };

  if (!selectedNote) {
    return <Text>Loading...</Text>;
  }

  return (
    <div>
    <Box rounded={'lg'}
      bg={"white"}
        boxShadow={'lg'}
        mt="1%"
        ml="28%"
        mb="1%"
        w={"50%"}
        p={8}>
      <Heading as="h1" pb="36px">
        Editeaza o notita!
      </Heading>

      <NoteForm
        onSubmitCallback={onSubmitCallback}
        inputValues={selectedNote}
        showCancelButton
        secondaryButtonClickAction={secondaryButtonClickAction}
      />
      </Box>
    </div>
  );
}

export default EditNote;