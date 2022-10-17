import Head from 'next/head';
import React, { useState } from 'react';
import styles from '../styles/Form.module.css';
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from 'react-icons/hi';
import Layout from '../layout/Layout';
import Link from 'next/link';
import { useFormik } from 'formik';
import { registerValidate } from '../lib/validate';
import { useRouter } from 'next/router';

const Register = () => {
  const router = useRouter();
  const [show, setShow] = useState({ password: false, cpassword: false });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      cpassword: '',
    },
    validate: registerValidate,
    onSubmit,
  });

  async function onSubmit(values) {
    const option = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    };

    await fetch('http://localhost:3000/api/auth/signup', option)
      .then((res) => res.json())
      .then((data) => {
        if (data) router.push('http://localhost:3000');
      });
  }
  return (
    <Layout>
      <Head>
        <title>Register</title>
      </Head>
      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-3">Register</h1>
          <p className="w-3/4 mx-auto text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          <div
            className={`${styles.input_group} ${
              formik.touched.username && formik.errors.username
                ? 'border-rose-600'
                : ' '
            }`}
          >
            <input
              type="text"
              name="username"
              placeholder="Username"
              className={styles.input_text}
              required
              autoFocus
              {...formik.getFieldProps('username')}
            />
            <span className="icon flex items-center px-4">
              <HiOutlineUser size={25} />
            </span>
          </div>

          <div
            className={`${styles.input_group}  ${
              formik.touched.email && formik.errors.email
                ? 'border-rose-600'
                : ' '
            }`}
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={styles.input_text}
              required
              {...formik.getFieldProps('email')}
            />
            <span className="icon flex items-center px-4">
              <HiAtSymbol size={25} />
            </span>
          </div>
          <div
            className={`${styles.input_group} ${
              formik.touched.password && formik.errors.password
                ? 'border-rose-600'
                : ' '
            }`}
          >
            <input
              type={`${show.password ? 'text' : 'password'}`}
              name="password"
              placeholder="Password"
              className={styles.input_text}
              required
              {...formik.getFieldProps('password')}
            />
            <span
              className="icon flex items-center px-4"
              onClick={() => setShow({ ...show, password: !show.password })}
            >
              <HiFingerPrint size={25} />
            </span>
          </div>

          <div
            className={`${styles.input_group} ${
              formik.touched.cpassword && formik.errors.cpassword
                ? 'border-rose-600'
                : ' '
            }`}
          >
            <input
              type={`${show.cpassword ? 'text' : 'password'}`}
              name="cpassword"
              placeholder="confirm Password"
              className={styles.input_text}
              required
              {...formik.getFieldProps('cpassword')}
            />
            <span
              className="icon flex items-center px-4"
              onClick={() => setShow({ ...show, cpassword: !show.cpassword })}
            >
              <HiFingerPrint size={25} />
            </span>
          </div>

          {/* login buttons */}

          <div className="input-button">
            <button type="submit" className={styles.button}>
              Register
            </button>
          </div>
        </form>

        <p className="text-center text-gray-400 ">
          {`don't have an account yet?`} {'  '}
          <Link href={'/login'}>
            <a className="text-blue-700">Sign Up</a>
          </Link>
        </p>
      </section>
    </Layout>
  );
};

export default Register;
