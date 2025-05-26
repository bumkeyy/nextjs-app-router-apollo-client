'use client';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { useState, useEffect } from 'react';

export default function Providers({ children }) {
  const [client, setClient] = useState(null);

  useEffect(() => {
    const client = new ApolloClient({
      uri: '/api/graphql',
      cache: new InMemoryCache(),
    });

    setClient(client);
  }, []);

  if (!client) return <div>Loading...</div>;

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
