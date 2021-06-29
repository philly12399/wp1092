import constants from '../constants';
import { gql } from '@apollo/client';  
import { useQuery,useMutation,useSubscription} from '@apollo/react-hooks';
import { useEffect } from 'react';
// Look at this file and see how the watchList is strucutred
export default function WatchList() {

    // TODO
    // query countStats
    // save the result in a counts variable
    const C_QUERY = gql`
    query  statsCount(
        $locationKeywords: [String]
        $severity:Int
        ){
            statsCount(locationKeywords:$locationKeywords,severity: $severity)      
    }`;
    const { loading, error, counts, subscribeToMore } = useQuery(
        C_QUERY,
        { variables: { locationKeywords:constants.watchList,severity:1} }
    );
    useEffect(() => {if(!loading&&counts!==undefined) {
        console.log(counts)
    }},[loading])
    // TODO
    // use subscription
    
    // DO NOT MODIFY BELOW THIS LINE
    return (
        <table>
        <tbody>
            <tr>
                <th>Keyword</th>
                <th>Count</th>
            </tr>
            {
                constants.watchList.map(
                    (keyword, idx) => 
                    <tr key={keyword}>
                        <td>{keyword}</td>
                        {/* You might need to see this */}
                        <td id={`count-${idx}`}>{!counts || ! counts.statsCount || counts.statsCount[idx]}</td>
                    </tr>
                )
            }
        </tbody>
        </table>
    );
}