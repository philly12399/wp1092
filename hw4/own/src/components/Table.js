import React, { Component } from "react";
class Table extends Component {
  static col_id2str(id) {
    var a0 = "A".charCodeAt(0);
    if (id < 26) return String.fromCharCode(a0 + id);
    else {
      var l1 = parseInt(id / 26) - 1;
      var l2 = id % 26;
      return String.fromCharCode(a0 + l1) + String.fromCharCode(a0 + l2);
    }
  }
  static col_str2id(str) {
    var id = 0;
    var a0 = "A".charCodeAt(0);
    if (str.length === 1) id = str.charCodeAt(0) - a0;
    else {
      id = 26;
      id += 26 * (str.charCodeAt(0) - a0);
      id += str.charCodeAt(1) - a0;
    }
    return id;
  }
  constructor(props) {
    super(props);
    this.state = { row_num: 100, col_num: 26, cList: [], fcs: [-1, -1], flag: 0 };
    this.cell = class cell {
      constructor() {
        this.clk = 0;
        this.isFunc = false;
        this.FuncType = "NULL";
        this.FuncErr = false;
        this.FuncValue = 0;
        this.FuncRef = [
          [-1, -1],
          [-1, -1],
        ];
        this.content = "";
      }
    };
    this.copied_cell=undefined;
    this.copied_ij=[-1,-1];
    this.e_flag = true;
    for (let i = 0; i < this.state.row_num; i++) {
      this.state.cList.push([]);
      for (let j = 0; j < this.state.col_num; j++) {
        this.state.cList[i].push(new this.cell());
      }
    }
  }
  isNumeric = (s) => {
    return !isNaN(s);
  };
  ij2id = (i, j) => {
    let s = Table.col_id2str(j) + (i + 1);
    return s;
  };
  id2ij = (id) => {
    id = id.toUpperCase();
    if (id.length >= 2) {
      var d1 = id.charCodeAt(0) - "A".charCodeAt(0);
      var d2 = id.charCodeAt(1) - "A".charCodeAt(0);
      var r_i = 0,
        r_j = 0;
      var v = false;
      if (d1 >= 0 && d1 < 26) {
        if (d2 >= 0 && d2 < 26) {
          r_j = Table.col_str2id(id.slice(0, 2));
          if (this.isNumeric(id.slice(2))) {
            r_i = parseInt(id.slice(2)) - 1;
            v = true;
          }
        } else {
          r_j = Table.col_str2id(id.slice(0, 1));
          if (this.isNumeric(id.slice(1))) {
            r_i = parseInt(id.slice(1)) - 1;
            v = true;
          }
        }
      }
      if (v) return [r_i, r_j];
    }
    return [-1, -1];
  };
  cell_blur = (i, j) => {
    console.log("blur");
    var fcs_in = document.getElementById(this.ij2id(i, j));
    var fcs_i = document.getElementById("th" + (i + 1));
    var fcs_j = document.getElementById("th" + Table.col_id2str(j));
    fcs_i.classList.remove("fcs");
    fcs_j.classList.remove("fcs");
    if (!this.state.cList[i][j].isFunc)
      this.state.cList[i][j].content = fcs_in.value;
    if (this.e_flag) this.state.fcs = [-1, -1];
    this.e_flag = true;
    this.state.cList[i][j].clk = 0;
    this.setState((state) => ({ flag: state.flag + 1 }));
  };
  cell_clk = (i, j) => {
    var fcs_in = document.getElementById(this.ij2id(i, j));
    var fcs_i = document.getElementById("th" + (i + 1));
    var fcs_j = document.getElementById("th" + Table.col_id2str(j));
    fcs_i.classList.add("fcs");
    fcs_j.classList.add("fcs");
    if (this.state.cList[i][j].clk === 0) {
      this.state.fcs = [i, j];
      fcs_in.value = this.state.cList[i][j].content;
      let s = this.ij2id(i, j);
      // console.log("First:"+s);
      this.state.cList[i][j].clk = 1;
    } else if (this.state.cList[i][j].clk === 1) {
      let s = this.ij2id(i, j);
      // console.log("Second:"+s);
      this.state.cList[i][j].clk = 2;
    }
  };
  cell_key = (i, j, e) => {
    if (e.key === "Enter") {
      this.e_flag = false;
      var fcs_in = document.getElementById(this.ij2id(i, j));
      if (this.state.cList[i][j].clk == 2)
        this.state.cList[i][j].content = fcs_in.value;
      var ni = Math.min(i + 1, this.state.row_num - 1);
      this.state.fcs = [ni, j];
      document.getElementById(this.ij2id(ni, j)).focus();
      var fcs_i = document.getElementById("th" + (ni + 1));
      var fcs_j = document.getElementById("th" + Table.col_id2str(j));
      fcs_i.classList.add("fcs");
      fcs_j.classList.add("fcs");
      this.state.cList[ni][j].clk = 1;
      this.setState((state) => ({ flag: state.flag + 1 }));
      return;
    }
    if (this.state.cList[i][j].clk === 1) {
      if (e.key === "Backspace" || e.key === "Delete") {
        document.getElementById(this.ij2id(i, j)).value = "";
        this.state.cList[i][j].clk = 2;
      } else {
        document.getElementById(this.ij2id(i, j)).value = "";
        this.state.cList[i][j].clk = 2;
      }
    }
  };

  pass_cell = (src_i, src_j, tar_i, tar_j) => {
    for (let prop in this.state.cList[src_i][src_j]) {
      if (prop !== undefined)
        this.state.cList[tar_i][tar_j][prop] = this.state.cList[src_i][src_j][
          prop
        ];
    }
  };
  renew_cell_func = (i, j, mode, fcs) => {
    var c = this.state.cList[i][j];
    var FuncType = c.FuncType;
    if(FuncType ==="NULL") return false;
    if (FuncType === "ref") {
      var del=false;
      if (mode === "+r") {
          if (c.FuncRef[0][0] >= fcs[0]) c.FuncRef[0][0]++;
        }
        else if (mode === "-r") {
          if (c.FuncRef[0][0] > fcs[0]) c.FuncRef[0][0]--;  
          if(c.FuncRef[0][0] == fcs[0])  del=true;  
      } else if (mode === "+c") {
        if (c.FuncRef[0][1] >= fcs[1]) c.FuncRef[0][1]++;}
       else if (mode === "-c") {
        if (c.FuncRef[0][1] > fcs[1]) c.FuncRef[0][1]--; 
        if(c.FuncRef[0][1] == fcs[1])  del=true;
      }
      if(del){
        c.content="ERROR!"
        c.isFunc=false;
      }
      else
      c =
        "="+this.ij2id(c.FuncRef[0][0], c.FuncRef[0][1]) ;
    }
    else {
      if (mode === "+r") {
        for (let l = 0; l < 2; l++) {
          if (c.FuncRef[l][0] >= fcs[0]) c.FuncRef[l][0]++;
        }
      } else if (mode === "-r") {
        for (let l = 0; l < 2; l++) {
          if (c.FuncRef[l][0] >= fcs[0]) c.FuncRef[l][0]--;
        }
      } else if (mode === "+c") {
        for (let l = 0; l < 2; l++) {
          if (c.FuncRef[l][1] >= fcs[1]) c.FuncRef[l][1]++;
        }
      } else if (mode === "-c") {
        for (let l = 0; l < 2; l++) {
          if (c.FuncRef[l][1] >= fcs[1]) c.FuncRef[l][1]--;
        }
    }
    if (FuncType === "sum") {
      this.state.cList[i][j].content =
        "=sum(" +
        this.ij2id(c.FuncRef[0][0], c.FuncRef[0][1]) +
        ":" +
        this.ij2id(c.FuncRef[1][0], c.FuncRef[1][1]) +
        ")";
    } else if (FuncType === "plus") {
      this.state.cList[i][j].content =
      "="+
      this.ij2id(c.FuncRef[0][0], c.FuncRef[0][1]) +
      "+" +
      this.ij2id(c.FuncRef[1][0], c.FuncRef[1][1]);
    }
    else if (FuncType === "minus") {
      this.state.cList[i][j].content =
      "="+
      this.ij2id(c.FuncRef[0][0], c.FuncRef[0][1]) +
      "-" +
      this.ij2id(c.FuncRef[1][0], c.FuncRef[1][1]);
    }}
  };
  copy_cell = (fcs) => {
    if(fcs[0]!==-1){
      if(this.copied_cell===undefined){
        this.copied_cell = new this.cell();
      }
      for (let prop in this.state.cList[fcs[0]][fcs[1]]) {
          if (prop !== undefined)
          this.copied_cell[prop] = this.state.cList[fcs[0]][fcs[1]][prop];
      }
      this.copied_ij=fcs;
    }
    
  };
  paste_cell = (fcs) => {
    if(fcs[0]!==-1){
      var c=this.state.cList[fcs[0]][fcs[1]];
      if(this.copied_cell!==undefined){
        for (let prop in this.copied_cell) {
          if (prop !== undefined)  c[prop]=this.copied_cell[prop];
        }
        if(c.isFunc){
          var dij=[fcs[0]-this.copied_ij[0],fcs[1]-this.copied_ij[1]];
          if(c.FuncType ==="sum"){
            for(let l=0;l<2;l++){
              for(let i=0;i<2;i++){
                c.FuncRef[l][i]+=dij[i];
              }
            }
            c.content =
            "=sum(" +
            this.ij2id(c.FuncRef[0][0], c.FuncRef[0][1]) +
            ":" +
            this.ij2id(c.FuncRef[1][0], c.FuncRef[1][1]) +
            ")";
          }else if(c.FuncType ==="ref"){
              for(let i=0;i<2;i++){
                c.FuncRef[0][i]+=dij[i];
              }
              c.content =
              "="+
              this.ij2id(c.FuncRef[0][0], c.FuncRef[0][1]) 
          }else if(c.FuncType ==="minus"||c.FuncType ==="plus"){
            for(let l=0;l<2;l++){
              for(let i=0;i<2;i++){
                if(c.FuncRef[l][i]!==-1)  c.FuncRef[l][i]+=dij[i];
              }
            }
            var sign;
            if(c.FuncType ==="minus") sign="-";
            else if(c.FuncType ==="plus") sign="+";
            c.content =
            "="+
            this.ij2id(c.FuncRef[0][0], c.FuncRef[0][1]) +
            sign +
            this.ij2id(c.FuncRef[1][0], c.FuncRef[1][1]);
          }
          this.parse_func(fcs[0],fcs[1],c.content);
          if(c.FuncErr) {
            c.content="ERROR!"
            c.isFunc=false;
          }
        }
        this.setState((state) => ({ flag: state.flag + 1 }));
      }
    }
  };
  add_col = (fcs) => {
    if (fcs[1] === -1) {
      fcs = [0, this.state.col_num - 1];
      for (let i = 0; i < this.state.row_num; i++) {
        this.state.cList[i].push(new this.cell());
      }
    } else {
      for (let i = 0; i < this.state.row_num; i++) {
        for (let j = 0; j < this.state.col_num; j++) {
          if (this.state.cList[i][j].isFunc)
            this.renew_cell_func(i, j, "+c", fcs);
        }
      }
      for (let i = 0; i < this.state.row_num; i++) {
        this.state.cList[i].push(new this.cell());
        //console.log(this.state.cList[i]);
        for (let j = this.state.col_num; j > fcs[1]; j--) {
          //console.log(j-1+"=>"+j);
          this.pass_cell(i, j - 1, i, j);
        }
        this.state.cList[i][fcs[1]] = new this.cell();
      }
    }
    //this.state.fcs=[fcs[0],fcs[1]+1];
    this.setState((state) => ({ col_num: state.col_num + 1 }));
  };
  add_row = (fcs) => {
    if (fcs[0] === -1) {
      fcs = [this.state.row_num - 1, 0];
      var new_row = [];
      for (let j = 0; j < this.state.col_num; j++) {
        new_row.push(new this.cell());
      }
      this.state.cList.push(new_row);
    } else {
      for (let i = 0; i < this.state.row_num; i++) {
        for (let j = 0; j < this.state.col_num; j++) {
          if (this.state.cList[i][j].isFunc)
            this.renew_cell_func(i, j, "+r", fcs);
        }
      }
      var new_row = [];
      //console.log("add c"+fcs[0]);
      for (let j = 0; j < this.state.col_num; j++) {
        new_row.push(new this.cell());
      }
      this.state.cList.push(new_row);
      for (let i = this.state.row_num; i > fcs[0]; i--) {
        for (let j = 0; j < this.state.col_num; j++) {
          this.pass_cell(i - 1, j, i, j);
        }
      }
      for (let j = 0; j < this.state.col_num; j++) {
        this.state.cList[fcs[0]][j] = new this.cell();
      }
    }
    //this.state.fcs=[fcs[0]+1,fcs[1]];
    this.setState((state) => ({ row_num: state.row_num + 1 }));
  };
  del_col = (fcs) => {
    if (fcs[1] !== -1) {
      var fcs_i = document.getElementById("th" + (fcs[0] + 1));
      var fcs_j = document.getElementById("th" + Table.col_id2str(fcs[1]));
      fcs_i.classList.remove("fcs");
      fcs_j.classList.remove("fcs");
      for (let i = 0; i < this.state.row_num; i++) {
        for (let j = 0; j < this.state.col_num; j++) {
          if (this.state.cList[i][j].isFunc)
            this.renew_cell_func(i, j, "-c", fcs);
        }
      }
      for (let i = 0; i < this.state.row_num; i++) {
        for (let j = fcs[1]; j < this.state.col_num - 1; j++) {
          this.pass_cell(i, j + 1, i, j);
        }
        this.state.cList[i].splice(this.state.col_num - 1, 1);
      }
      this.state.fcs = [-1, -1];
      this.state.col_num--;
      this.setState((state) => ({ flag: state.flag - 1 }));
    }
  };
  del_row = (fcs) => {
    if (fcs[0] !== -1) {
      var fcs_i = document.getElementById("th" + (fcs[0] + 1));
      var fcs_j = document.getElementById("th" + Table.col_id2str(fcs[1]));
      fcs_i.classList.remove("fcs");
      fcs_j.classList.remove("fcs");
      for (let i = 0; i < this.state.row_num; i++) {
        for (let j = 0; j < this.state.col_num; j++) {
          if (this.state.cList[i][j].isFunc)
            this.renew_cell_func(i, j, "-r", fcs);
        }
      }
      for (let i = fcs[0]; i < this.state.row_num - 1; i++) {
        for (let j = 0; j < this.state.col_num; j++) {
          this.pass_cell(i + 1, j, i, j);
        }
      }
      this.state.cList.splice(this.state.row_num - 1, 1);
      this.state.fcs = [-1, -1];
      this.state.row_num--;

      this.setState((state) => ({ flag: state.flag - 1 }));
    }
  };
  sum_cells=(src_i,src_j,tar_i,tar_j)=>{
    if(src_i>tar_i || src_j>tar_j) return false;
    var sum=0;
    for(let i=src_i;i<=tar_i;i++){
      for(let j=src_j;j<=tar_j;j++){
        if(this.state.cList[i][j].content ==="") continue;
        if(this.state.cList[i][j].isFunc)  sum+=parseFloat(this.state.cList[i][j].FuncValue);
        else{
          if(!this.isNumeric(this.state.cList[i][j].content)) return false;
          if(!isNaN(parseFloat(this.state.cList[i][j].content)))
            sum+=parseFloat(this.state.cList[i][j].content);
        }       
      }
    }
    return sum;
  }
  rm_space = (str) => {
    var sub_str = str.trim().split(" ");
    var new_str = "";
    for (let s of sub_str) {
      if (s !== " ") new_str = new_str + s;
    }
    return str;
  };
  inrange(ij){
    if(ij[0]>=0&&ij[0]<this.state.row_num&&ij[1]>=0&&ij[1]<this.state.col_num) return true;
    return false;
  }
  parse_func = (i, j, str) => {
    this.state.cList[i][j].isFunc = false;
    if (str[0] === "=") {
      var new_str = this.rm_space(str.slice(1));
      this.state.cList[i][j].isFunc = true;
      this.state.cList[i][j].FuncErr = true;
      this.state.cList[i][j].FuncType="NULL";

      if (new_str.slice(0, 3) === "sum" || new_str.slice(0, 3) === "Sum") {
        this.state.cList[i][j].FuncType = "sum";
        var in_str = new_str.slice(3);
        if (in_str[0] === "(" && in_str[in_str.length - 1] === ")") {
          in_str = in_str.slice(1, in_str.length - 1).split(":");
          if (in_str.length == 2) {
            var c1 = this.id2ij(in_str[0]),
              c2 = this.id2ij(in_str[1]);
            if (c1[0] !== -1 && c2[0] !== -1) {
              if(this.inrange(c1)&&this.inrange(c2)){
                var x = this.sum_cells(c1[0], c1[1], c2[0], c2[1]);
                if (x !== false) {
                  this.state.cList[i][j].FuncErr = false;
                  this.state.cList[i][j].FuncValue = x;
                  this.state.cList[i][j].FuncRef = [c1, c2];
                }
              }
            }
          }
        }
      } else if (this.id2ij(new_str)[0] !== -1) {
        var src = this.id2ij(new_str);
        if(src[0]===i&&src[1]===j) return;
        if(this.inrange(src)){
          var src_ref=this.state.cList[src[0]][src[1]].FuncRef;
          var loop=false;
          for(let l=0;l<2;l++){
              if(src_ref[l][0]!==-1&&src_ref[l][1]!==-1){
                console.log("in");
                if(src_ref[l][0]===i&&src_ref[l][1]===j) {loop=true;}
              }
          }
          if(loop){

          }
          else{
            this.state.cList[i][j].FuncErr = false;
            this.state.cList[i][j].FuncType = "ref";
            this.state.cList[i][j].FuncValue = this.get_cell_value(src[0], src[1]);
            this.state.cList[i][j].FuncRef[0] = [src[0], src[1]];
          }
        }
      } else if (new_str.includes("+") || new_str.includes("-")) {
        var sign = " ";
        if (new_str.includes("+")) sign = "+";
        else if (new_str.includes("-")) sign = "-";
        var in_str = new_str.split(sign);
        if (in_str.length == 2) {
          var c = [this.id2ij(in_str[0]), this.id2ij(in_str[1])];
          var v = [NaN, NaN];
          for (let l = 0; l < 2; l++) {
            if (c[l][0] === -1) {
              if (in_str[l] === "") {
                v[l] = 0;
              } else if (this.isNumeric(in_str[l])) {
                v[l] = parseFloat(in_str[l]);
              }
            } else {
              if(!this.inrange(c[l])) return;
              v[l] = this.get_cell_value(c[l][0], c[l][1]);
              this.state.cList[i][j].FuncRef[l] = [c[l][0], c[l][1]];
            }
          }
          if (!isNaN(v[0]) && !isNaN(v[1])) {
            //string
            if (v[0] == "") v[0] = 0;
            if (v[1] == "") v[1] = 0;
            if (!isNaN(parseInt(v[0])) && !isNaN(parseInt(v[1]))) {
              //space
              if (sign === "+") {
                this.state.cList[i][j].FuncErr = false;
                this.state.cList[i][j].FuncType = "plus";
                this.state.cList[i][j].FuncValue =
                  parseFloat(v[0]) + parseFloat(v[1]);
              } else if (sign === "-") {
                this.state.cList[i][j].FuncErr = false;
                this.state.cList[i][j].FuncType = "minus";
                this.state.cList[i][j].FuncValue =
                  parseFloat(v[0]) - parseFloat(v[1]);
              }
            }
          }
        }
      }
    }
  };
  get_cell_value = (i, j) => {
    this.parse_func(i, j, this.state.cList[i][j].content);
    if (this.state.cList[i][j].isFunc) {
      if (this.state.cList[i][j].FuncErr) return "ERROR!";
      return this.state.cList[i][j].FuncValue;
    } else {
      return this.state.cList[i][j].content;
    }
  };
  componentWillUpdate(nextProps, nextState) {
    for (let t = 0; t < 2; t++) {
      for (let i = 0; i < this.state.row_num; i++) {
        for (let j = 0; j < this.state.col_num; j++) {
          let s = this.ij2id(i, j);
          var fcs_in = document.getElementById(s);
          fcs_in.value = this.get_cell_value(i, j);
        }
      }
    }
  }
  /*componentDidUpdate(){
    if(this.state.fcs[0]!==-1 ){
      document.getElementById(this.ij2id(this.state.fcs[0],this.state.fcs[1])).focus();
    }
  }*/
  render() {
    console.log("fcs on:" + this.state.fcs[0] + "," + this.state.fcs[1]);
    var rows = [];
    var table = [];
    var arow = [];
    for (let j = 0; j < this.state.col_num; j++)
      arow = arow.concat(
        <th id={"th" + Table.col_id2str(j)}>{Table.col_id2str(j)}</th>
      );
    rows = rows.concat([arow]);
    for (let i = 0; i < this.state.row_num; i++) {
      arow = this.state.cList[i].map((e,index) => {
        let s=this.ij2id(i,index);
        return (
          <td >
            <input type="text" id={s} 
            onClick={(e)=>{this.cell_clk(i,index)}}  onBlur={()=>{this.cell_blur(i,index)}}
            onKeyDown={(e)=>{this.cell_key(i,index,e)}} 
             />
          </td>
        );
      });
      rows = rows.concat([arow]);
    }
    
    return (
      <header className="Table">
        <button id="cp" onMouseDown={()=>{this.add_col(this.state.fcs)}}>+</button>
        <button id="cm" onMouseDown={()=>{this.del_col(this.state.fcs)}}>-</button>
        <button id="rp" onMouseDown={()=>{this.add_row(this.state.fcs)}}>+</button>
        <button id="rm" onMouseDown={()=>{this.del_row(this.state.fcs)}}>-</button>
        <button id="copy" onMouseDown={()=>{this.copy_cell(this.state.fcs)}}>copy</button>
        <button id="paste" onMouseDown={()=>{this.paste_cell(this.state.fcs)}}>paste</button>
        <table >
        {rows.map((e,index)=>{return <tr><th id={"th"+index} >{(index===0)? "":index}</th>{e}</tr>})}          
        </table>
      </header >
    );
  }
}
export default Table;
