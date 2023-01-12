import gql from "graphql-tag";

const HOME_QUERY = gql`
  query HomeQuery {
    page(id: 1) {
      title
      who_fr
      who_en
      talents_fr
      talents_en
      who_intro_fr
      who_intro_en
      events_fr
      events_en
      tailor_fr
      tailor_en
      shop_fr
      shop_en
      giftings_fr
      giftings_en
      creations {
        name
        img {
          url
        }
      }
      talents {
        id
        followers
        firstname
        lastname
        profile_pic {
          url
        }
      }
    }
  }
`;

export default HOME_QUERY;
