import gql from "graphql-tag";

const TALENTS_QUERY = gql`
  query TalentsList {
    talents {
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
    }
  }
`;

export default TALENTS_QUERY;
