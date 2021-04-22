import Cell from "../components/Cell"

export default function Row ({
    _data, handleclick, handleinput
}){
    if(_data[0].r === 0){
        return (
            <>
                <div className="row bg-light">
                    {_data.map((v,i) => {
                        v.c = i;
                        return (<Cell 
                            key={'cell-' + v.r + '-' + v.c}
                            _data={v}
                            handleclick={handleclick}
                            handleinput={handleinput}
                        />
                        );
                    })}
                </div>
            </>

        )
    }
    return(
        <>
            <div className="row">
                {_data.map((v,i) => {
                    v.c = i;
                    return (<Cell
                        _data={v} 
                        key={'cell-' + v.r + '-' + v.c}
                        handleclick={handleclick}
                        handleinput={handleinput}
                    />
                    );
                })}
            </div>
        </>
    );
}