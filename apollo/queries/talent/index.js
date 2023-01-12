import gql from "graphql-tag";

const TALENT_QUERY = gql`
  query Talent($id: ID!) {
    talent(id: $id) {
      id
      firstname
      lastname
      followers
      instagram_id
      profile_pic {
        url
      }
      portfolio {
        url
      }
      creations {
        name
        instagram_link
        img {
          url
        }
      }
      instagram_last_pics {
        url
        id
        date
        img {
          url
        }
      }
    }
  }
`;

export default TALENT_QUERY;
