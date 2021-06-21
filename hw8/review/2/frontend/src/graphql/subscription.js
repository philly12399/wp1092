import { gql } from '@apollo/client';

export const CHATBOX_SUBSCRIPTION = gql`
  subscription newMessage(
      $chatboxName: String!
  ){
    newMessage(
        chatboxName: $chatboxName
    ){
        data{
            body
            sender{name}
        }
        chatboxName
    }
  }
`;