import { useEffect } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'next-auth/client';
import { ApolloProvider } from '@apollo/client';

import '../theme/styles.css';
import { theme } from '../theme';
import { useApollo } from '../apolloClient';

const App = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <Provider session={pageProps.session}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </ApolloProvider>
  );
};

export default App;
