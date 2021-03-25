import React from 'react';
import { useSession } from 'next-auth/client';
import Link from 'next/link';
import Layout from '../components/Layout';

const profile = () => {
  const [session, loading] = useSession();
  console.log(session);
  return (
    <Layout>
      {session ? (
        <>
          <p>Hello {session.user.name}.</p>
          <p>Welcome to your profile page.</p>
          <p>Here are your bookings:</p>
        </>
      ) : (
        <>
          <p>This is the profile page. Please sign in</p>
          <p>
            Please{' '}
            <Link href='/api/auth/signin'>
              <a>Sign In</a>
            </Link>
          </p>
        </>
      )}
    </Layout>
  );
};

export default profile;
