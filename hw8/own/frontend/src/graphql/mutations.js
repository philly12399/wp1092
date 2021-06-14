import { gql } from '@apollo/client';
const CREATE_CB_MUTATION = gql`
  mutation createChatBox(
    $name1: String!
    $name2: String!
  ) {
    createChatBox(
        name1: $name1
        name2: $name2
    ) {
        id
        name
        messages{
            sender{name}
            to{name}
            body
        }
    }
  }
`;
const CREATE_MSG_MUTATION = gql`
  mutation createMessage(
    $sender: String!
    $to: String!
    $body:String!
  ) {
    createMessage(
        sender:$sender
        to:$to
        body:$body
    ) {
        sender{name}
        to{name}
        body        
    }
  }
`;
export { CREATE_CB_MUTATION,CREATE_MSG_MUTATION };