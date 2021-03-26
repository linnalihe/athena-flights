import React from 'react';
import { useSession } from 'next-auth/client';
import Link from 'next/link';
import Layout from '../components/Layout';
import { useQuery } from '@apollo/client';
import { GET_BOOKING } from '../graphql/queries/getBooking';
import BookedTilesContainer from '../components/BookedTilesContainer';
import Loading from '../components/loading/Loading';

const profile = () => {
  const [session] = useSession();

  let accessToken: string;
  if (session && session.accessToken) {
    accessToken = session.accessToken;
  } else {
    accessToken = '';
  }

  const { data, loading, error } = useQuery(GET_BOOKING, {
    variables: { accessToken },
  });

  if (loading)
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  if (error) return <Layout>Error: {error.message}</Layout>;
  if (!data) return <Layout>Not found</Layout>;

  return (
    <Layout img={'spacex--p-KCm6xB9I-unsplash.jpg'}>
      {session ? (
        <>
          {' '}
          <p>Hello {session.user.name}.</p>
          <p>Welcome to your profile page.</p>
          <p>Here are your bookings:</p>
          <BookedTilesContainer launches={data.getBookings} session={session} />
        </>
      ) : (
        <>
          <p>This is the profile page.</p>
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
