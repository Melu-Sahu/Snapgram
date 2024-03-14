import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { SigninValidation as formSchema } from '@/lib/validations';
import { z } from 'zod';
import Loader from '@/components/shared/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useSignInAccountMutation } from '@/lib/react-query/queryAndMutations';
import { useUserContext } from '@/context/AuthContext';



const SigninForm = () => {

  const { toast } = useToast()

  const { mutateAsync: signInAccount, isPending: isSigningIn } = useSignInAccountMutation();
  const navigate = useNavigate();

  const { checkAuthUser } = useUserContext()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {

    const session = await signInAccount({
      email: values.email,
      password: values.password
    })

    if (!session) {
      return toast({
        title: "Signin Failed. Please try again!!",
        variant:"destructive"
      })
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      toast({
        title:"LoggedIn Successfully."
      })
      navigate('/')
    } else {
      return toast({ title: "Signup Failed. Please try again!!" });

    }

  }

  return (

    <>
      <Form {...form}>
        <div className='sm:w-420 flex-center flex-col'>
          <img src='/assets/images/logo.svg' alt='Logo' className='mt-10' />
          <h2 className='h3-bold  md:h2-bold sm:pt-12 lg:pt-5'>Signin to your account</h2>
          <p className='text-light-3 small-medium md:base-regular mt-2'>Welcome back, please enter your credentials</p>
        </div>
        <div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full mt-4">
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
            <Button type="submit" className='shad-button_primary my-4'>{(isSigningIn) ? (
              <div className='flex-center gap-2'> <Loader />Loading...</div>
            ) : "Sign up"}</Button>
            <p className='text-small-regular text-light-2 text-center mt-1'>Don't have any account?
              <Link to="/sign-up" className='text-primary-500 text-small-semibold ml-1'>Sign up.</Link></p>
          </form>
        </div >
      </Form>
    </>
  )
}

export default SigninForm;
