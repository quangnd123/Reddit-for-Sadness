import React from "react";
import "semantic-ui-css/semantic.min.css";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import Layout from "../components/Layout.js";
import { AuthProvider } from "../context/auth.js";
import { setContext } from "apollo-link-context";

const URI =
  process.env.NODE_ENV === "production"
    ? "https://cz2006-344712.et.r.appspot.com/graphql"
    : "http://localhost:4000/graphql";
const httpLink = createHttpLink({
  uri: URI,
});

const authLink = setContext(() => {
  let token;
  if (typeof window !== null) token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default MyApp;
