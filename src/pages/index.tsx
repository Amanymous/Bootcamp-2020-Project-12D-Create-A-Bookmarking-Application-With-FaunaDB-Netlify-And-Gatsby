import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import gql from "graphql-tag";

const GET_BOOKMARK = gql`
  {
    bookmarks {
      id
      url
      title
    }
  }
`;

export default function Home() {
  const { error, loading, data } = useQuery(GET_BOOKMARK);
  console.log(data);

  // if (error) return <h3>{error}</h3>;
  // if (loading) return <h3>loading</h3>;
  // console.log(data);
  return <h1>Hello world!</h1>;
}
