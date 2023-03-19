import React, { useState } from 'react'
import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { VStack } from '@chakra-ui/layout'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import { CLOUD_NAME, IMAGE_UPLOAD_URL, UPLOAD_PRESET } from '../../secrets'
import { BASE_URL } from '../../constant/constant'

const SignUpForm = () => {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  const toast = useToast()
  const history = useHistory()

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [pic, setPic] = useState()
  const [picLoading, setPicLoading] = useState(false)

  const onChangeName = (e) => setName(e.target.value)
  const onChangeEmail = (e) => setEmail(e.target.value)
  const onChangePassword = (e) => setPassword(e.target.value)
  const onChangeConfirmPassword = (e) => setConfirmPassword(e.target.value)

  /**
   * Triggered when user tapped on the SignUp button
   * @returns Promise<void>
   */
  const submitHandler = async () => {
    setPicLoading(true)
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: 'Please Fill all the Feilds',
        status: 'warning',
        duration: 2000,
        isClosable: true,
        position: 'bottom',
      })
      setPicLoading(false)
      return
    }
    if (password !== confirmPassword) {
      toast({
        title: 'Passwords Do Not Match',
        status: 'warning',
        duration: 2000,
        isClosable: true,
        position: 'bottom',
      })
      return
    }
    console.log(name, email, password, pic)
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      }
      const { data } = await axios.post(
        `${BASE_URL}/api/user`,
        {
          name,
          email,
          password,
          profileAvatar: pic,
        },
        config
      )
      console.log(data)
      toast({
        title: 'Registration Successful',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'bottom',
      })
      localStorage.setItem('userInfo', JSON.stringify(data))
      setPicLoading(false)
      history.push('/chats')
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: error.response.data.message,
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'bottom',
      })
      setPicLoading(false)
    }
  }

  const postDetails = (pics) => {
    setPicLoading(true)
    if (pics === undefined) {
      toast({
        title: 'Please Select an Image!',
        status: 'warning',
        duration: 2000,
        isClosable: true,
        position: 'bottom',
      })
      return
    }
    console.log(pics)
    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData()
      data.append('file', pics)
      data.append('upload_preset', UPLOAD_PRESET)
      data.append('cloud_name', CLOUD_NAME)
      fetch(IMAGE_UPLOAD_URL, {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString())
          console.log(data.url.toString())
          setPicLoading(false)
        })
        .catch((err) => {
          console.log(err)
          setPicLoading(false)
        })
    } else {
      toast({
        title: 'Please Select an Image!',
        status: 'warning',
        duration: 2000,
        isClosable: true,
        position: 'bottom',
      })
      setPicLoading(false)
      return
    }
  }

  return (
    <VStack spacing='10px'>
      <FormControl id='name_field' isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          value={name}
          placeholder='Enter Your Name'
          onChange={onChangeName}
        />
      </FormControl>
      <FormControl id='email_field' isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          value={email}
          type='email'
          placeholder='Enter Your Email Address'
          onChange={onChangeEmail}
        />
      </FormControl>
      <FormControl id='password_field_sign_up' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size='md'>
          <Input
            value={password}
            onChange={onChangePassword}
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
      <FormControl id='confirm_password_field' isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size='md'>
          <Input
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
            type={show ? 'text' : 'password'}
            placeholder='Enter confirm password'
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id='pic_field'>
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type='file'
          p={1.5}
          accept='image/*'
          onChange={(e) =>
            postDetails(e?.target?.files[0].size > 0 && e?.target.files[0])
          }
        />
      </FormControl>
      <Button
        colorScheme='blue'
        width='100%'
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={picLoading}>
        Sign Up
      </Button>
    </VStack>
  )
}

export default SignUpForm
