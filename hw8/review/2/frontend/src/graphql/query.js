import { gql } from '@apollo/client';

export const CHATBOX_QUERY = gql`
    query aChatBox(
        $name: String
    ){
        aChatBox(
            name:$name
        ){
            messages{body}
        }
    }
`;