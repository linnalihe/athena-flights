import React from 'react';
import { useSession } from 'next-auth/client';
import Link from 'next/link';
import Layout from '../components/Layout';
import { useQuery } from '@apollo/client';
import { GET_BOOKING } from '../graphql/queries/getBooking';
import BookedTilesContainer from '../components/BookedTilesContainer';

const profile = () => {
  const [session] = useSession();

  if (!session) {
    return (
      <Layout>
        <p>This is the profile page. Please sign in</p>
        <p>
          Please{' '}
          <Link href='/api/auth/signin'>
            <a>Sign In</a>
          </Link>
        </p>
      </Layout>
    );
  }
  const { data, loading, error } = useQuery(GET_BOOKING, {
    variables: { accessToken: session.accessToken },
  });

  if (loading) return <Layout>Loading...</Layout>;
  if (error) return <Layout>Error: {error.message}</Layout>;
  if (!data) return <Layout>Not found</Layout>;

  return (
    <Layout>
      <p>Hello {session.user.name}.</p>
      <p>Welcome to your profile page.</p>
      <p>Here are your bookings:</p>
      <BookedTilesContainer launches={data.getBookings} session={session} />
    </Layout>
  );
};

export default profile;
