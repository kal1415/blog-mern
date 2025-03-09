import { Button, Flex, Heading, Input, useToast, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router";

export default function LoginPage() {
  const [navigate,setNavigate] = useState(false);
  const toast = useToast();
  const {register,handleSubmit,formState:{errors}} = useForm();
  const onSubmit = async (data) => {
    const res = await fetch("http://localhost:4000/login", {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials:'include'
    });
    if (res.ok) {
      setNavigate(true)
      toast({
        title: "User logged in successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      
    } else {
      toast({
        title: "User login failed",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };
  if(navigate){
    return <Navigate to={'/'}/>
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex justify="center" align="center" direction="column" gap={2}>
        <Heading size="lg"> Login </Heading>
        <Input placeholder="Email" type="email" {...register('email',{required:true})}/>
        {errors.email && <Text color="red.600">Email is required</Text>}
        <Input placeholder="Password" type="password" {...register('password',{required:true})}/>
        {errors.password && <Text color="red.600">Password is required</Text>}
        <Button w={"full"} bg="black" color={"white"} colorScheme="black" type="submit">
          Login
        </Button>
      </Flex>
    </form>
  );
}
