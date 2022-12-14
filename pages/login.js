import Head from 'next/head';
import React, { useState } from 'react';
import styles from '../styles/Form.module.css';
import { HiAtSymbol, HiFingerPrint } from 'react-icons/hi';
import Layout from '../layout/Layout';
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import login_validate from '../lib/validate';

const Login = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: login_validate,
    onSubmit,
  });

  async function onSubmit(values) {
    console.log(values);
    const status = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: '/',
    });

    if (status.ok) router.push('/');
  }

  const handleGoogleSignIn = async () => {
    await signIn('google', { callbackUrl: 'http://localhost:3000' });
  };
  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>
      <div className="w-3/4 mx-auto flex flex-col gap-10 ">
        <div className="title">
          <h1 className="text-4xl  py-4 text-gray-800 font-bold">Login</h1>
          <p className="w-3/4 mx-auto text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>

        {/*form*/}

        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          <div className={styles.input_group}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={styles.input_text}
              required
              autoFocus
              {...formik.getFieldProps('email')}
            />
            <span className="icon flex items-center px-4">
              <HiAtSymbol size={25} />
            </span>
          </div>
          <div className={styles.input_group}>
            <input
              type={`${show ? 'text' : 'password'}`}
              name="password"
              placeholder="Password"
              className={styles.input_text}
              required
              {...formik.getFieldProps('password')}
            />
            <span
              className="icon flex items-center px-4"
              onClick={() => setShow(!show)}
            >
              <HiFingerPrint size={25} />
            </span>
          </div>

          {/* login buttons */}

          <div className="input-button">
            <button type="submit" className={styles.button}>
              Login
            </button>
          </div>
          <div className="input-button">
            <button
              type="button"
              className={styles.button_custom}
              onClick={handleGoogleSignIn}
            >
              Sign In with Google
              <Image
                src={'/assets/google.svg'}
                width="20"
                height={20}
                alt="icon"
              ></Image>
            </button>
          </div>
          <div className="input-button">
            <button type="button" className={styles.button_custom}>
              Sign In with Github
              <Image
                src={'/assets/github.svg'}
                width={25}
                height={25}
                alt="icon"
              ></Image>
            </button>
          </div>
        </form>

        {/* bottom */}
        <p className="text-center text-gray-400 ">
          {`don't have an account yet?`} {'  '}
          <Link href={'/register'}>
            <a className="text-blue-700">Sign Up</a>
          </Link>
        </p>
      </div>
    </Layout>
  );
};

export default Login;
