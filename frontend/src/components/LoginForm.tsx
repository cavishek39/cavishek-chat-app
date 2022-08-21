import React, { useState } from 'react'
import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { VStack } from '@chakra-ui/layout'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'

const LoginForm = () => {
  const [show, setShow] = useState<boolean>(false)
  const handleClick = () => setShow(!show)
  const toast = useToast()
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)

  const history = useHistory()
  return (
    <VStack spacing='10px'>
      <FormControl id='email' isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          value={email}
          type='email'
          placeholder='Enter Your Email Address'
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id='password' isRequired>
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
        // onClick={submitHandler}
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
