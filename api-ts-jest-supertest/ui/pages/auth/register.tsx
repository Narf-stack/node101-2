import {useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {useRouter} from 'next/router'
import {zodResolver} from '@hookform/resolvers/zod'
import {object, string, TypeOf} from 'zod'


// Schema of inputs required in the form, will be used for the validation through zod
const createUserSchema  = object({
    name: string().nonempty({
      message: 'Name is required'
    }), 
    password: string().nonempty({
      message: 'password is required'
    }).min(6, 'Password should be 6 chars min'),
    passwordConfirmation: string().nonempty({
      message: 'password is required'
    }).min(6, 'Password confirmation should be 6 chars min'), 
    email: string().nonempty({
      message: 'password is required'
    }).email('not valid email')
  }).refine((data) => data.password === data.passwordConfirmation, { // look if booth password match https://github.com/colinhacks/zod#customize-error-path
    message: "Passwords don't match",
    path: ["passwordConfirmation"]
})

type createUserInput = TypeOf< typeof createUserSchema >

function RegisterPage(){
  const [registerError, setRegisterError] = useState<string | null>(null)
  const router = useRouter()
  const {
    register, 
    formState:{errors}, 
    handleSubmit
  } = useForm<createUserInput>({
    resolver: zodResolver(createUserSchema) // validation if form values aligned with schema definition 
  })

  async function onSubmit(values:createUserInput){ // on submit create user
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/users`, values)
    } catch (error:any) {
      let messages = [ ]
      messages.push(error.response.data)
      messages.push(error.message)
      setRegisterError(messages)
      router.push("/")
    }
  }

  return (
    <>
      <p>{registerError}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-element'>
          <label htmlFor='email'> Email </label>
          <input id ='email' type='email' placeholder='jane@ex.com' {...register('email')}/>
          <p>{errors.email?.message}</p>
        </div>

        <div className='form-element'>
          <label htmlFor='name'> name </label>
          <input id ='name' type='text' placeholder='jane' {...register('name')}/>
          <p>{errors.name?.message}</p>
        </div>

        <div className='form-element'>
          <label htmlFor='password'> password </label>
          <input id ='password' type='password' placeholder='****' {...register('password')}/>
          <p>{errors.password?.message}</p>
        </div>

        <div className='form-element'>
          <label htmlFor='passwordConfirmation'> password confirmation </label>
          <input id ='passwordConfirmation' type='password' placeholder='****' {...register('passwordConfirmation')}/>
          <p>{errors.passwordConfirmation?.message}</p>
        </div>
        <button type='submit'> SUBMIT</button>
      </form>
    </>
  )
}


export default RegisterPage