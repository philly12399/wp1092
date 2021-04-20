import Grid from '../components/Grid'
export default function Row (props) {
    var row_idx=props.row_idx;
    var grids=[];
    for(let i=0;i<4;i++){
      grids.push(
          <Grid row_idx={row_idx} column_idx={i} value={props.row_value[i]}/>
      );
    }
    
    return (
      <tr>
        {grids}
      </tr>
    );
};