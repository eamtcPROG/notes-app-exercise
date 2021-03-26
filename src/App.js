import React, { useEffect, useState } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  Stack,
  Heading,
  Button
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';


import Home from './pages/Home';
import CreateNote from './pages/CreateNote';
import { getNotesAction } from './actions/notesActions';
import Note from './pages/Note';
import EditNote from './pages/EditNote.js';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import Signup from './pages/Signup';



function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch(`https://notes-api-eamtc.herokuapp.com/api/authentication/check-auth`, {
      headers: {
        Authorization: token,
      },
    }).then((res) => {
        switch (res.status) {
          case 200:
            setIsAuthenticated(true);
            break;
          default:
            setIsAuthenticated(false);
            break;
        }
      })
      .catch(console.error);
  }, []);
  
  const loguot = () => {
    localStorage.removeItem("token");
    fetch(`https://notes-api-eamtc.herokuapp.com/api/authentication/logout`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      switch (res.status) {
        case 200:
          setIsAuthenticated(false);
          break;
        default:
          setIsAuthenticated(true);
          break;
      }
    });
}


  useEffect(() => {
    dispatch(getNotesAction());
  }, [dispatch]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className="App">


<Box bg="#184e77" px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: !isOpen ? 'none' : 'inherit' }}
            onClick={isOpen ? onClose : onOpen}
          />
             
          <HStack spacing={8} alignItems={'center'} >
          <Heading color="white" as="h2">StepIt Notes</Heading>
            <NavLink  to="/">
            {isAuthenticated ?
                <Link   as="h5"  color="white">Notitele mele</Link>
                :null}
              </NavLink>
            
            
              <NavLink to="/create-note">
              {isAuthenticated ?
                <Link  color="white">Creaza o notita</Link>
                :null}
                </NavLink>
           
          </HStack>
          <Stack
            flex={{  base: 'none', md: 'inline-flex' }}
            justify={'flex-end'}
            direction={'row'}
            spacing={10}
            >
            
          <NavLink  to="/login">
            {isAuthenticated ? <Button
             display={{ base: 'none', md: 'inline-flex' }}
             color="white"
              fontSize={'16px'}
              fontWeight={400}
              bg={'#184e77'}
              p={"10px"} 
              type={"button"}
              onClick={loguot}
              >
              Logout
            </Button>:
            <Link
             display={{ base: 'none', md: 'inline-flex' }}
             color="white"
              fontSize={'16px'}
              fontWeight={400}
              bg={'#184e77'}
              p={"10px"} 
              
              >
              Sign In
            </Link>
            }
          </NavLink>
          <NavLink  to="/register">
          {isAuthenticated ? null:
          <Link
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'16px'}
            color={'black'}
            borderRadius={"5%"}
            bg={'#d9ed92'}
            p={"10px"}
            _hover={{
              bg: '#ef1a4c',
              borderRadius:"5%",
              color:"white"
            }}>
            Sign Up
          </Link>
        }
          </NavLink>
        </Stack>
        </Flex>

      </Box>


      
        <Flex>
        <Box width="100%" >
          <Switch>
            <PrivateRoute
              path="/notes/:id/edit"
              component={EditNote}
              isAuthenticated={isAuthenticated}
            />
            <PrivateRoute
              path="/notes/:id"
              component={Note}
              isAuthenticated={isAuthenticated}
            />
            <PrivateRoute
              path="/create-note"
              component={CreateNote}
              isAuthenticated={isAuthenticated}
            />
            <Route
              path="/login"
              render={(props) => (
                <Login {...props} setIsAuthenticated={setIsAuthenticated} />
              )}
            />
            <Route
              path="/register"
              render={(props) => (
                <Signup {...props} setIsAuthenticated={setIsAuthenticated} />
              )}
            />
            <PrivateRoute
              path="/"              
              isAuthenticated={isAuthenticated}
              render={(props) => <Home {...props} 
            />}/>
          </Switch>
        </Box>
        </Flex>
    </div>
      
    
  );
}

export default App;
