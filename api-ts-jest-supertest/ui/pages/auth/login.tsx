import {useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {useRouter} from 'next/router'
import {zodResolver} from '@hookform/resolvers/zod'
import {object, string, TypeOf} from 'zod'


// Schema of inputs required in the form, will be used for the validation through zod
const createSessionSchema  = object({
    password: string().nonempty({
      message: 'password is required'
    }).min(6, 'Password should be 6 chars min'), 
    email: string().nonempty({
      message: 'email is required'
    }).email('not valid email')
})

type createSessionInput = TypeOf< typeof createSessionSchema >

function LoginPage(){
  const [loginError, setLoginError] = useState<string | null>(null)
  const router = useRouter()
  const {
    register, 
    formState:{errors}, 
    handleSubmit
  } = useForm<createSessionInput>({
    resolver: zodResolver(createSessionSchema) // validation if form values aligned with schema definition 
  })

  async function onSubmit(values:createSessionInput){ // on submit create user
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/sessions`, 
      values, 
      {withCredentials:true} // make sure that the cookies are being set ( see tab Application in chrome dev) 
    )
    } catch (error:any) {
      let messages = [ ]
      messages.push(error.response.data)
      messages.push(error.message)
      setLoginError(messages)
      router.push("/")
    }
  }

  return (
    <>
      <p>{loginError}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-element'>
          <label htmlFor='email'> Email </label>
          <input id ='email' type='email' placeholder='jane@ex.com' {...register('email')}/>
          <p>{errors.email?.message}</p>
        </div>

        <div className='form-element'>
          <label htmlFor='password'> password </label>
          <input id ='password' type='password' placeholder='****' {...register('password')}/>
          <p>{errors.password?.message}</p>
        </div>


        <button type='submit'> SUBMIT</button>
      </form>
    </>
  )
}


export default LoginPage