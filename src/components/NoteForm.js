import React from 'react';
import { Input, Textarea, Button } from '@chakra-ui/react';

const initialState = {
  title: '',
  content: '',
  tags: [],
};

function NoteForm({
  inputValues = initialState,
  onSubmitCallback,
  secondaryButtonClickAction,
  showCancelButton = false,
}) {
  const [value, setValue] = React.useState(inputValues);

  const handleInputChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onSubmitCallback(value);
  };

  return (
    
      <form onSubmit={onSubmit}>
        <Input
          name="title"
          value={value.title}
          onChange={handleInputChange}
          placeholder="Titlul notitei"
          mb="24px"
        />
        <Textarea
          value={value.content}
          onChange={handleInputChange}
          name="content"
          placeholder="Detaliile notitei"
          size="sm"
          mb="24px"
          minHeight="400px"
        />

        <Button type="submit" marginRight="24px">
          Submit
        </Button>
        {showCancelButton ? (
          <Button
            onClick={secondaryButtonClickAction}
            backgroundColor="red.600"
            color="white"
            type="button"
          >
            Cancel
          </Button>
        ) : null}
      </form>
    
  );
}

export default NoteForm;