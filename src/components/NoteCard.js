import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Text } from '@chakra-ui/react';

const NoteCard = ({ note })=> {
  if (!note || !note.title || !note.text) {
    return null;
  }

  return (
    <Link to={`/notes/${note._id}`}>
      <Box ml="37%"
        data-testid="note-card"
        width="250px"
        overflow="hidden"
        padding="12px"
        boxShadow="md"
        borderRadius="8px"
        marginBottom="12px"
        bg="#1a759f"
      >
        <Text 
          fontSize="lg"
          color="#d9ed92"
          marginTop="1"
          fontWeight="semibold"
          as="h3"
          lineHeight="tight"
          isTruncated
        >
          {note.title}
        </Text>
        <Text
        color="#d9ed92"
          mt="1"
          lineHeight="tight"
          isTruncated
          maxH="50px"
          overflow="hidden"
        >
          {note.text}
        </Text>
      </Box>
    </Link>
  );
}

export default NoteCard;