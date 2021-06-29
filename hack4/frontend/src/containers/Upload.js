import Uploader from '../components/Uploader';
import { gql } from '@apollo/client';
import "./Upload.css";
import { useQuery,useMutation,useSubscription} from '@apollo/react-hooks';

export default function Upload() {

    // TODO get the mutation function
    // pass it to the Uploader component
    const P_MUTATION = gql`
                mutation insertPeople(
                    $ssn:String!
                    $name:String!
                    $severity:Int!
                    $l_name:String!
                    $l_des:String!
                ) {
                    insertPeople(
                        data:[{
                            ssn:$ssn
                            name:$name
                            severity:$severity
                            location:{
                                name:$l_name
                                description:$l_des
                            }
                        }]
                    )
                }
                `;
                const [addP] = useMutation(P_MUTATION);
    return <div id="Upload">
        <div id="PeopleUploader">
            <Uploader tag="People" mutation={async (data) => {
                console.log(data.ssn)
                await addP({
                    variables:{
                        $ssn:data.ssn,
                        $name:data.name,
                        $severity:data.severity,
                        $l_name:data.location.name,
                        $l_des:data.location.description,
                    },
                });
                
            }}/>
        </div>
    </div>;
}
