import { gql } from '@apollo/client';

const MSG_SUBSCRIPTION = gql`
    subscription message(
    $chatname: String!
  ) {
    message(
        chatname: $chatname
    ) {
        mutation
        data{
            sender{name}
            to{name}
            body
        }
    }
  }
`;
const CB_SUBSCRIPTION = gql`
    subscription 
    chatbox{
        mutation
        data{
          name
          messages{
            body
          }
        }
    }
`;
export {MSG_SUBSCRIPTION,CB_SUBSCRIPTION};