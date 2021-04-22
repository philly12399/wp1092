export default function Cell ({ 
    _data, _ref, handleclick, handleinput
}) {
    let cn = "";
    if (!_data.c) {
        cn = "row-index bg-light";
        if (_data.focus){
            cn = "row-index bg-light index-focus";
        }
    }
    else if (!_data.r) {
        cn = "col-index bg-light";
        if (_data.focus){
            cn = "col-index bg-light index-focus";
        }
    }
    else if (_data.focus) {
        cn = "cell-focus";
        if (_data.input){
            return (
                <div className="cell-input" onClick={e => handleclick(e,_data)}>
                    <textarea autoFocus value={_data.data} onChange={e => handleinput(e, _data)}/>
                </div>
            );
        }
    }
    return (<div className={cn} onClick={e => handleclick(e,_data)}>{_data.data}</div>);
}