import React, { useEffect } from 'react'
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import LoginForm from '../components/auth/LoginForm'
import SignUpForm from '../components/auth/SignUpForm'

export const Home = () => {
  const history = useHistory()

  /**
   * Checks if the user is currently in the localStorage
   * then push him/her into the chat page
   */
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo')!)

    if (!userInfo) {
      history.push('/')
    }
  }, [])

  return (
    <Container maxW='xl' centerContent>
      <Box
        display='flex'
        justifyContent='center'
        p={3}
        bg='white'
        w='100%'
        m='40px 0 15px 0'
        borderRadius='lg'
        borderWidth='1px'>
        <Text fontSize='4xl' fontFamily='monospace'>
          Groupper
        </Text>
      </Box>
      <Box bg='white' w='100%' p={4} borderRadius='lg' borderWidth='1px'>
        <Tabs isFitted variant='soft-rounded'>
          <TabList mb='1em'>
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <LoginForm />
            </TabPanel>
            <TabPanel>
              <SignUpForm />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}
