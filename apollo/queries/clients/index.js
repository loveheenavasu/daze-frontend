import gql from "graphql-tag";

const CLIENTS_QUERY = gql`
  query ClientsList {
    clients {
      name
      logo {
        url
      }
    }
    creations {
      name
      instagram_link
      img {
        url
      }
    }
  }
`;

export default CLIENTS_QUERY;
