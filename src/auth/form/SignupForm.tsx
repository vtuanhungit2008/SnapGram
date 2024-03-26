import { Button } from '@/components/ui/button'

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { SignUpValidation } from '@/lib/validate'
import {z} from "zod"
import { Link, useNavigate } from 'react-router-dom'

import { useCreateUserAccountMutation } from '@/lib/react-query/queryAndMutaion'

const SignupForm = () => {
  const {mutateAsync:createUserAccount,isPending:isCheckedCreateAccount} = useCreateUserAccountMutation();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      username: "",
      name:"",
      password:"",
      email:"",
    },
  })
  async function onSubmit(values: z.infer<typeof SignUpValidation>) {
      await createUserAccount(values)
      form.reset();
      navigate("/sign-in");
  }
  return (
    <Form {...form}>  
    <div className='sm:w-420 flex-c enter flex-col'>
      
      <img src="/assets/images/logo.svg" alt="" />
      <h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'>Create new accout !</h2>
   
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type='text' className='shad-input'{...field} />
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage />

            </FormItem>

            
          )}
          
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type='text' className='shad-input'{...field} />
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage />

            </FormItem>

            
          )}
          
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='email' className='shad-input'{...field} />
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage />

            </FormItem>

            
          )}
          
        />
         <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' className='shad-input'{...field} />
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage />

            </FormItem>

            
          )}
          
        />
        <Button type="submit" className='shad-button_primary'>
          {isCheckedCreateAccount ? "Loading...": "Sign up"}
          
          </Button>
          <p className='text-small-regular text-light-2 text-center mt-2'>Already have an account?
            <Link to="/sign-in"  className='text-primary-500 text-small-semibold ml-1'>Log in</Link>
          </p>
      </form>
      </div>
    </Form>
  )
}

export default SignupForm
