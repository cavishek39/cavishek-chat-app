import React, { useState } from 'react'
import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { VStack } from '@chakra-ui/layout'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import { User } from '../../types/user'
import { ChatState } from '../../context/chatProvider'
import { BASE_URL } from '../../constant/constant'

const LoginForm = () => {
  const [show, setShow] = useState<boolean>(false)
  const handleClick = () => setShow(!show)
  const toast = useToast()
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)

  const history = useHistory()
  const { setUser } = ChatState()

  const submitHandler = async () => {
    setLoading(true)

    if (!email || !password) {
      toast({
        title: 'Please Fill all the Feilds',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
      setLoading(false)
      return
    }

    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      }

      const { data } = await axios.post<User>(
        `${BASE_URL}/api/user/login`,
        { email, password },
        config
      )

      // console.log('Data coming from server ', data)
      if (!!data?._id) {
        setLoading(false)
        setUser(data)
        history.push('/chats')
        localStorage.setItem('userInfo', JSON.stringify(data))
        toast({
          title: 'Login Successful',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        })
      }
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
      setLoading(false)
    }
  }

  return (
    <VStack spacing='10px'>
      <FormControl key='email_field' id='email' isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          value={email}
          type='email'
          placeholder='Enter Your Email Address'
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl key='password_field' id='password_field' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size='md'>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? 'text' : 'password'}
            placeholder='Enter password'
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme='blue'
        width='100%'
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}>
        Login
      </Button>
      <Button
        variant='solid'
        colorScheme='red'
        width='100%'
        onClick={() => {
          setEmail('guest@example.com')
          setPassword('123456')
        }}>
        Get Guest User Credentials
      </Button>
    </VStack>
  )
}

export default LoginForm
