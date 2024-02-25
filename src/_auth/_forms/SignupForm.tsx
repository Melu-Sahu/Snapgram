import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { SignupValidation as formSchema } from '@/lib/validations';
import { z } from 'zod';
import Loader from '@/components/shared/Loader';
import { Link } from 'react-router-dom';
import { createUserAccount } from '@/lib/appwrite/api';



const SignupForm = () => {

  const isLoading = false;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: ""
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const newUser = await createUserAccount(values);
    console.log(newUser);
    if(newUser){
      
      console.log("account created", newUser);
    }else{
      console.log("Account Creation Failed");
      
    }
  }

  return (

    <>
      <Form {...form}>
        <div className='sm:w-420 flex-center flex-col'>
          <img src='/assets/images/logo.svg' alt='Logo' />
          <h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'>create new account</h2>
          <p className='text-light-3 small-medium md:base-regular mt-2'>To use Snapgram, enter your details</p>
        </div>
        <div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full mt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type='text' className='shad-input' {...field} />
                  </FormControl>
                  <FormMessage className='text-red' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Name</FormLabel>
                  <FormControl>
                    <Input type='text' className='shad-input' {...field} />
                  </FormControl>
                  <FormMessage className='text-red' />
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
                    <Input type='email' className='shad-input' {...field} />
                  </FormControl>
                  <FormMessage className='text-red' />
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
                    <Input type='password' className='shad-input' {...field} />
                  </FormControl>
                  <FormMessage className='text-red' />
                </FormItem>
              )}
            />
            <Button type="submit" className='shad-button_primary'>{(isLoading) ? (
              <div className='flex-center gap-2'> <Loader />Loading...</div>
            ) : "Sign up"}</Button>
            <p className='text-small-regular text-light-2 text-center mt-2'>Already have an account?
              <Link to="/sign-in" className='text-primary-500 text-small-semibold ml-1'>Log in.</Link></p>
          </form>
        </div >
      </Form>
    </>
  )
}

export default SignupForm;
