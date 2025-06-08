import React from 'react';
import Head from 'next/head';
import AuthForm from '../components/AuthForm';
import styles from '../styles/auth-test.module.css';

const AuthTest = () => {
  return (
    <>
      <Head>
        <title>Тестирование формы авторизации</title>
        <meta name="description" content="Тестовая страница для проверки формы авторизации" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.container}>
        <h1 className={styles.title}>Тестирование формы авторизации</h1>
        <div className={styles.formTestContainer}>
          <AuthForm />
        </div>
      </main>
    </>
  );
};

export default AuthTest; 