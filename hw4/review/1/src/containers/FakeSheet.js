import React, { Component } from "react";
import Grid from "./Grid";

class FakeSheet extends Component {
    constructor(prop){
        super(prop)
        let data = Array.from(Array(prop.r+1), () => (new Array(prop.c+1)).fill(0).map(()=>{
            return {
                data: '',
                r: 0,
                c: 0,
                focus: false,
                input: false,
            };
        }));
        data = this.colindex(data);
        data = this.rowindex(data);
        this.state = {
            _size: {
                r: prop.r,
                c: prop.c
            },
            _data: data,
            _focus: {
                focus: false,
                input: false,
                r: 0,
                c: 0
            }
        }
        this.handleclick = this.handleclick.bind(this);
        this.handleinput = this.handleinput.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handlebuttonclick = this.handlebuttonclick.bind(this);
    }

    componentDidMount = () => {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    colindex(data){
        data[0] = data[0].map((v,i) => {
            if(i === 0){
                return v;
            }
            var n = i-1;
            var ordA = 'A'.charCodeAt(0);
            var ordZ = 'Z'.charCodeAt(0);
            var len = ordZ - ordA + 1;
          
            var s = "";
            while(n >= 0) {
                s = String.fromCharCode(n % len + ordA) + s;
                n = Math.floor(n / len) - 1;
            }
            v.data = s;
            return v;
        })
        return data;
    }

    rowindex(data){
        return data.map((v,i) => {
            if(i === 0){
                return v;
            }
            v[0].data = String(i);
            return v;
        });
    }

    handlebuttonclick (e, f) {
        let b = this.state._focus;
        let r = b.r;
        let c = b.c;
        if(!b.focus){
            r = this.state._size.r;
            c = this.state._size.c;
        }
        let a = this.state._data;
        let s = this.state._size;
        switch(f){
            case 1:
                a = this.arrayModify(a, r, true, false);
                s.r = s.r + 1;
                break;
            case 2:
                if(s.r === 0){
                    break;
                }
                a = this.arrayModify(a, r, true, true);
                s.r = s.r - 1;
                break;
            case 3:
                a = this.arrayModify(a, c, false, false);
                s.c = s.c + 1;
                break;
            case 4:
                if(s.c === 0){
                    break;
                }
                a = this.arrayModify(a, c, false, true);
                s.c = s.c - 1;
                break;
            default: break;
        }
        if(b.focus){
            switch(f){
                case 1: b.r = b.r + 1; break;
                case 2:
                    if(r > s.r){
                        b.focus = false;
                        break;
                    }
                    a[r][c].focus = true;
                    a[r][0].focus = true;
                    break;
                case 3: b.c = b.c + 1; break;
                case 4:
                    if(c > s.c){
                        b.focus = false;
                        break;
                    }
                    a[r][c].focus = true;
                    a[0][c].focus = true;
                    break;
                default: break;
            }
        }
        this.setState({
            _data: a,
            _focus: b,
            _size: s
        });
    }

    arrayModify(data, index, row, del) {
        // data: array to be modified
        // index: which row/colon
        // row: is row or colon
        // del: delete or not
        if(row){
            if(del){
                data.splice(index, 1);
                return this.rowindex(data);
            }
            const len = data[0].length;
            data.splice(index, 0, (new Array(len)).fill(0).map(()=>{
                return {
                    data: '',
                    r: 0,
                    c: 0,
                    focus: false,
                    input: false,
                };
            }))
            return this.rowindex(data);
        }
        if(del){
            return this.colindex(
                data.map(a => {
                    a.splice(index, 1);
                    return a;
                })
            )
        }
        return this.colindex(
            data.map(a => {
                a.splice(index, 0, {
                    data: '',
                    r: 0,
                    c: 0,
                    focus: false,
                    input: false,
                });
                return a;
            })
        )
    }

    handleclick (e, data) {
        const r = data.r;
        const c = data.c;
        let a = this.state._data;
        let b = this.state._focus;
        if(!data.focus){
            if(b.focus){
                a[b.r][b.c].focus = false;
                a[b.r][b.c].input = false;
                a[b.r][0].focus = false;
                a[0][b.c].focus = false;
                b.input = false;
                b.r = r;
                b.c = c;
            }
            else{
                b.focus = true;
                b.r = r;
                b.c = c;
            }
            a[r][c].focus = true;
            a[r][0].focus = true;
            a[0][c].focus = true;
        }
        else{
            a[r][c].input = true;
            b.input = true;
        }
        this.setState({
            _data: a,
            _focus: b
        });
    }

    handleinput (e, data) {
        const r = data.r;
        const c = data.c;
        let a = this.state._data;
        a[r][c].data = e.target.value;
        this.setState({
            _data: a
        })
    }

    handleKeyDown (e) {
        let a = this.state._data;
        let b = this.state._focus;
        let s = this.state._size;
        if(!b.focus || b.input){
            return;
        }
        if([13, 37, 38, 39, 40].includes(e.keyCode)){
            a[b.r][b.c].focus = false;
            a[b.r][b.c].input = false;
            a[b.r][0].focus = false;
            a[0][b.c].focus = false;
            switch(e.keyCode){
                case 40:
                case 13:
                    if(b.r === s.r){
                        break;
                    }
                    b.r = b.r+1; break;
                case 37:
                    if(b.c === 1){
                        break;
                    }
                    b.c = b.c-1; break;
                case 38:
                    if(b.r === 1){
                        break;
                    }
                    b.r = b.r-1; break;
                case 39:
                    if(b.c === s.c){
                        break;
                    }
                    b.c = b.c+1; break;
                default: break;
            }
            a[b.r][b.c].focus = true;
            a[b.r][0].focus = true;
            a[0][b.c].focus = true;
            return this.setState({
                _data: a,
                _focus: b
            });
        }
        if(b.focus){
            a[b.r][b.c].data = "";
            a[b.r][b.c].input = true;
            b.input = true;
            return this.setState({
                _data: a,
                _focus: b
            });
        }
    }

    render () {
        return (
            <>
            <div class="row-adder bg-dark">
                <div></div>
                <button onClick={e => this.handlebuttonclick(e,1)}>+</button>
                <button onClick={e => this.handlebuttonclick(e,2)}>-</button>
            </div>
            <div class="container-bg">
                <div class="col-adder bg-dark">
                    <button onClick={e => this.handlebuttonclick(e,3)}>+</button>
                    <button onClick={e => this.handlebuttonclick(e,4)}>-</button>
                </div>
                <Grid
                    _data={this.state._data}
                    handleclick={this.handleclick}
                    handleinput={this.handleinput}
                />
            </div>
            
            </>
        );
    }
}

export default FakeSheet;

