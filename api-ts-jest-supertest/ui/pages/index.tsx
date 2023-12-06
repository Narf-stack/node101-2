import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import {GetServerSideProps, NextPage} from 'next'
import styles from '@/styles/Home.module.css'
import swr from 'swr'
import fetcher from '../utils/fetcher'
import useSwr from 'swr'
// import {useSWRHandler} from 'swr/dist/use-swr'

interface User {
  _id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  session: string;
  iat: number;
  exp: number;
}

const Home:NextPage<{fallbackData:User}> = ({fallbackData}) => {
  const {data} = useSwr<User>(
    `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`, fetcher, {fallbackData}
  )

  if(data){
    return <div>Welcome {data.name}</div>
  }

  return (
      <div className={styles.container}>
        please login
      </div>
  )
}

/// fetch user server side
export const getServerSideProps: GetServerSideProps = async(context)=> {

  const data = await fetcher(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`,context.req.headers
  )

  return{props: {fallbackData:data}}
}
export default Home
