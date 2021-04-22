import Row from "./Row"

export default function Grid ({
    _data, handleclick, handleinput
}){
    return(
        <>
        <div className="container">
            {_data.map((v,i) => {
                v = v.map(f => {
                    f.r = i;
                    return f;
                })
                return (<Row 
                    key={'row-' + i} _data={v}
                    handleclick={handleclick}
                    handleinput={handleinput}/>);
            })}
        </div>
        </>
    );
}