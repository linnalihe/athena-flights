import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    // Providers.Google({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    // }),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    {
      id: 'recurse',
      name: 'Recurse Center',
      type: 'oauth',
      version: '2.0',
      accessTokenUrl: 'https://www.recurse.com/oauth/token',
      authorizationUrl:
        'https://www.recurse.com/oauth/authorize?response_type=code',
      clientId: process.env.RECURSE_ID,
      clientSecret: process.env.RECURSE_SECRET,
      params: { grant_type: 'authorization_code' },
      scope: '',
      profileUrl: 'https://www.recurse.com/api/v1/profiles/me',
      async profile(profile) {
        return profile;
      },
    },
    // Providers.Email({
    //   server: {
    //     port: 465,
    //     host: 'smtp.gmail.com',
    //     secure: true,
    //     auth: {
    //       user: process.env.EMAIL_USERNAME,
    //       pass: process.env.EMAIL_PASSWORD,
    //     },
    //     tls:{
    //       rejectUnauthorized: false,
    //     }
    //   },
    //   from: process.env.EMAIL_FROM,
    // }),
  ],
  // debug: process.env.NODE_ENV === 'development',
  // secret: process.env.AUTH_SECRET,
  // jwt: {
  //   secret: process.env.JWT_SECRET,
  // },
  // database: process.env.DATABASE_URL
};

export default (req, res) => NextAuth(req, res, options);
