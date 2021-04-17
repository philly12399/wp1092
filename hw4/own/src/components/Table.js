import React, { Component } from "react";
class Table extends Component {
  static col_id2str(id) {
    var a0 = "A".charCodeAt(0);
    if (id < 26) return String.fromCharCode(a0+id);
    else {
      var l1 = parseInt(id / 26) - 1;
      var l2 = id % 26;
      return (
        String.fromCharCode(a0+l1) + String.fromCharCode(a0+l2)
      );
    }
  }
  static col_str2id(str) {
    var id=0;
    var a0 = "A".charCodeAt(0);
    if(str.length === 1) id=str.charCodeAt(0)-a0;
    else{
      id=26;
      id+= 26*(str.charCodeAt(0)-a0);
      id+=str.charCodeAt(1)-a0;
    } 
    return id;
  }
  constructor(props) {
    super(props);
    this.state = { row_num: 5, col_num: 1, cList: [],fcs:[-1,-1],flag:0};
    this.btn_clk=false;
    this.cell = class cell {
      constructor(i, j) {
        this.clk = 0;
        this.c_i = i;
        this.c_j = j;
        this.content = "";
      }
    };
    for (let i = 0; i < this.state.row_num; i++) {
      this.state.cList.push([]);
      for (let j = 0; j < this.state.col_num; j++) {
        this.state.cList[i].push(new this.cell(i, j));
      }
    }
  }
  
  ij2id=(i,j)=>{
    let s=Table.col_id2str(j)+(i+1);
    return s;
  }
  cell_blur=(i,j)=>{
    console.log("blr");
    this.state.fcs=[-1,-1];
    this.state.cList[i][j].clk = 0;
    this.btn_clk= false;
    this.setState((state)=>({flag:state.flag+1}));
  }
  cell_clk=(i,j)=>{
    if(this.state.cList[i][j].clk === 0){
      this.setState((state) => ({ fcs:[i,j] }));
      let s=this.ij2id(i,j);
     // console.log("First:"+s);
      this.state.cList[i][j].clk = 1;
    }
    else if(this.state.cList[i][j].clk === 1){
      let s=this.ij2id(i,j);
     // console.log("Second:"+s);
      this.state.cList[i][j].clk = 2;
    } 
  }
  cell_change=(i,j)=>{
    let s=this.ij2id(i,j);
    var fcs_in = document.getElementById(s);
    //console.log(s+":"+fcs_in.value);
    this.state.cList[i][j].content=fcs_in.value;
    this.setState((state)=>({flag:state.flag+1 }))
  }
  pass_cell=(src_i,src_j,tar_i,tar_j)=>{
    this.state.cList[tar_i][tar_j].content = this.state.cList[src_i][src_j].content;
  }
  add_col=(fcs)=>{
    this.btn_clk=true;
    console.log("msdown");
    if(fcs[1] === -1){
      fcs=[0,this.state.col_num-1];
      for (let i = 0; i < this.state.row_num; i++) {
        this.state.cList[i].push(new this.cell(i,this.state.col_num));
      }
    }
    else{
      for (let i = 0; i < this.state.row_num; i++) {
          this.state.cList[i].push(new this.cell(i,this.state.col_num));
          //console.log(this.state.cList[i]);
          for(let j=this.state.col_num; j>fcs[1];j--){
            this.pass_cell(i,j-1,i,j);
          }
          this.state.cList[i][fcs[1]]=new this.cell(i,fcs[1]);
      }
      
    }
    //this.state.fcs=[fcs[0],fcs[1]+1];
    this.setState((state)=>({col_num:state.col_num+1}));
  }
  add_row=(fcs)=>{
    this.btn_clk=true;
    if(fcs[0] === -1){
      fcs=[this.state.row_num-1,0];
      var new_row=[];
      for(let j=0; j<this.state.col_num;j++){
          new_row.push(new this.cell(this.state.row_num,j));
      }
      this.state.cList.push(new_row);
    }
    else{
      var new_row=[];
      //console.log("add c"+fcs[0]);
      for(let j=0; j<this.state.col_num;j++){
          new_row.push(new this.cell(this.state.row_num,j));
      }
      this.state.cList.push(new_row);
      for (let i = this.state.row_num; i > fcs[0]; i--) {
        for(let j=0; j<this.state.col_num;j++){
          this.pass_cell(i-1,j,i,j);
        }        
      }
      for(let j=0; j<this.state.col_num;j++){
        this.state.cList[fcs[0]][j]=new this.cell(fcs[0],j);
      }   
    }
    //this.state.fcs=[fcs[0]+1,fcs[1]];
    this.setState((state)=>({row_num:state.row_num+1 }));
    
  }
  del_col=(fcs)=>{
    this.btn_clk=true;
    if(fcs[1]!==-1){
      for (let i = 0; i < this.state.row_num; i++) {
        for(let j=fcs[1]; j<this.state.col_num-1;j++){
          this.pass_cell(i,j+1,i,j);
        }
        this.state.cList[i].splice(this.state.col_num-1, 1);;
      }
      this.state.fcs=[-1,-1];
      this.setState((state)=>({col_num:state.col_num-1}));
    }
  }
  del_row=(fc)=>{
    this.btn_clk=true;
    //if(fcs[0]!==-1)
  }

  componentDidUpdate(){
    /*if(this.state.fcs[0]!==-1 ){
      document.getElementById(this.ij2id(this.state.fcs[0],this.state.fcs[1])).focus();
    }*/
  }
  
  render() {
    console.log("fcs on:"+this.state.fcs[0]+","+this.state.fcs[1]);
    var rows = [];
    var table = [];
    var arow = [];
    for (let i = 0; i < this.state.col_num; i++)
      arow=arow.concat((<th>{Table.col_id2str(i)}</th>));
    rows = rows.concat([arow]);
    
    for (let i = 0; i < this.state.row_num; i++) {
      arow = this.state.cList[i].map((e,index) => {
        let s=this.ij2id(i,index);
        return (
          <td >
            <input type="text" id={s} value={this.state.cList[i][index].content}
            onClick={(e)=>{this.cell_clk(i,index)}}  onBlur={()=>{this.cell_blur(i,index)}}
            onChange={(e)=>{this.cell_change(i,index)}}
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
        <table >
        {rows.map((e,index)=>{return <tr><th>{(index===0)? "":index}</th>{e}</tr>})}          
        </table>
      </header >
    );
  }
}
export default Table;

