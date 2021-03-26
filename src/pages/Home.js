import React from 'react';
import { Heading, Box ,useColorModeValue} from '@chakra-ui/react';
import { connect } from 'react-redux';

import NoteCard from '../components/NoteCard';

const Home = (props)=> {
  console.log("notes", props.notes);
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
      { 
        props.notes.notes?
       props.notes.notes.map( (note, id) => {
        return <NoteCard key={id} note={note} />; }):null
       }
      
      
    </Box>

    </div>
  );
}
const mapStateToProps = (state) => {
  return { loading: state.loading, error: state.error, notes: state.notes };
};

export default connect(mapStateToProps)(Home);