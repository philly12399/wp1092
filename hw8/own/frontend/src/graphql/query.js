import { gql } from '@apollo/client';
export const CB_QUERY = gql`
  query  chatboxs(
    $query: String!  ){
    chatboxs(query:$query){
      body
      sender{name}
      }
   }
`;