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
    this.state = { row_num: 5, col_num: 5, cList: [],fcs:[-1,-1],flag:0};
    this.cell = class cell {
      constructor(i, j) {
        this.clk = 0;
        this.isFunc=false;
        this.FuncType=false;
        this.FuncErr=false;
        this.FuncValue=0;
        this.FuncRef=[[-1,-1],[-1,-1]];
        this.content = "";
      }
    };
    this.e_flag=true;
    for (let i = 0; i < this.state.row_num; i++) {
      this.state.cList.push([]);
      for (let j = 0; j < this.state.col_num; j++) {
        this.state.cList[i].push(new this.cell(i, j));
      }
    }
  }
  isNumeric=(s)=>{
    return !isNaN(s);
  }
  ij2id=(i,j)=>{
    let s=Table.col_id2str(j)+(i+1);
    return s;
  }
  id2ij=(id)=>{
    id=id.toUpperCase();
    if(id.length>=2){
      var d1=id.charCodeAt(0)-"A".charCodeAt(0);
      var d2=id.charCodeAt(1)-"A".charCodeAt(0);
      var r_i=0,r_j=0;
      var v=false;
      if(d1>=0&&d1<26){
        if(d2>=0&&d2<26){
          r_j=Table.col_str2id(id.slice(0,2));
          if(this.isNumeric(id.slice(2))){
            r_i=parseInt(id.slice(2))-1;
            v=true;
          }
        }
        else{
          r_j=Table.col_str2id(id.slice(0,1));
          if(this.isNumeric(id.slice(1))){
            r_i=parseInt(id.slice(1))-1;
            v=true;
          }
        }
      }
      if(v) return [r_i,r_j];
    }
    return[-1,-1];
  }
  cell_blur=(i,j)=>{
    var fcs_in = document.getElementById(this.ij2id(i,j));
    if(!this.state.cList[i][j].isFunc)
      this.state.cList[i][j].content=fcs_in.value;
    if(this.e_flag) this.state.fcs=[-1,-1];
    this.e_flag=true;
    this.state.cList[i][j].clk = 0;
    this.setState((state)=>({flag:state.flag+1}));
  }
  cell_clk=(i,j)=>{
    var fcs_in = document.getElementById(this.ij2id(i,j));
    if(this.state.cList[i][j].clk === 0){
      fcs_in.value=this.state.cList[i][j].content;
      this.setState((state)=>({fcs:[i,j]}));
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
  cell_key=(i,j,e)=>{
    if(e.key==="Enter"){
      this.e_flag=false;
      var fcs_in = document.getElementById(this.ij2id(i,j));
      if(this.state.cList[i][j].clk==2)
      this.state.cList[i][j].content=fcs_in.value;
      var ni=Math.min(i+1,this.state.row_num-1);
      this.state.fcs=[ni,j]
      document.getElementById(this.ij2id(ni,j)).focus();
      this.state.cList[ni][j].clk = 1;
      return;
    }
    if(this.state.cList[i][j].clk === 1){
      if(e.key==="Backspace"||e.key==="Delete" ){
        document.getElementById(this.ij2id(i,j)).value="";
        this.state.cList[i][j].clk = 2;
      }
      else{
        document.getElementById(this.ij2id(i,j)).value="";
        this.state.cList[i][j].clk = 2;
      }
    }   
  }

  pass_cell=(src_i,src_j,tar_i,tar_j)=>{
    for(let prop in this.state.cList[src_i][src_j]){
      if(prop!==undefined)
        this.state.cList[tar_i][tar_j][prop] = this.state.cList[src_i][src_j][prop];
    }
  }
  renew_cell_func=(i,j,mode,fcs)=>{}
  copy_cell=(fcs)=>{};
  paste_cell=(fcs)=>{};
  add_col=(fcs)=>{
    if(fcs[1] === -1){
      fcs=[0,this.state.col_num-1];
      for (let i = 0; i < this.state.row_num; i++) {
        this.state.cList[i].push(new this.cell(i,this.state.col_num));
      }
    }
    else{
      console.log("fcs add:"+this.state.fcs[0]+","+this.state.fcs[1]);
      for (let i = 0; i < this.state.row_num; i++) {
          this.state.cList[i].push(new this.cell(i,this.state.col_num));
          //console.log(this.state.cList[i]);
          for(let j=this.state.col_num; j>fcs[1];j--){
            //console.log(j-1+"=>"+j);
            this.pass_cell(i,j-1,i,j);
          }
          this.state.cList[i][fcs[1]]=new this.cell(i,fcs[1]);
      }
      
    }
    //this.state.fcs=[fcs[0],fcs[1]+1];
    this.setState((state)=>({col_num:state.col_num+1}));
  }
  add_row=(fcs)=>{
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
    if(fcs[1]!==-1){
      for (let i = 0; i < this.state.row_num; i++) {
        for(let j=fcs[1]; j<this.state.col_num-1;j++){
          this.pass_cell(i,j+1,i,j);
        }
        this.state.cList[i].splice(this.state.col_num-1, 1);;
      }
      this.state.fcs=[-1,-1];
      this.state.col_num--;
      this.setState((state)=>({flag:state.flag-1}));
    }
  }
  del_row=(fcs)=>{
    if(fcs[0]!==-1){
        for(let i=fcs[0]; i<this.state.row_num-1;i++){
          for(let j=0;j<this.state.col_num;j++){
            this.pass_cell(i+1,j,i,j);
          }
        }
        this.state.cList.splice(this.state.row_num-1, 1);;
      this.state.fcs=[-1,-1];
      this.state.row_num--;
      this.setState((state)=>({flag:state.flag-1}));
    }
  }
  sum_cells=(src_i,src_j,tar_i,tar_j)=>{
    if(src_i>tar_i || src_j>tar_j) return false;
    var sum=0;
    for(let i=src_i;i<=tar_i;i++){
      for(let j=src_j;j<=tar_j;j++){
        if(this.state.cList[i][j].content ==="") continue;
        if(this.state.cList[i][j].isFunc)  sum+=parseFloat(this.state.cList[i][j].FuncValue);
        else{
          if(!this.isNumeric(this.state.cList[i][j].content)) return false;
          sum+=parseFloat(this.state.cList[i][j].content);
        }
       
      }
    }
    return sum;
  }
  rm_space=(str)=>{
    var sub_str = str.trim().split(" ");
    var new_str="";
    for(let s of sub_str){
      if(s!==" ")
      new_str=new_str+s;
    }
    return str;
  }
  parse_func=(i,j,str)=>{
    this.state.cList[i][j].isFunc=false;
    if(str[0]==='='){
      var new_str = this.rm_space(str.slice(1));
      this.state.cList[i][j].isFunc=true;
      this.state.cList[i][j].FuncErr=true;
      this.state.cList[i][j].FuncRef=[[-1,-1],[-1,-1]];;
      if(new_str.slice(0,3) ==="sum"||new_str.slice(0,3) ==="Sum"){        
        this.state.cList[i][j].FuncType="sum";
        var in_str=new_str.slice(3);
        if(in_str[0]==="(" &&in_str[in_str.length-1]===")"){ 
          in_str=in_str.slice(1,in_str.length-1).split(":");        
          if(in_str.length == 2){       
            var c1=this.id2ij(in_str[0]),c2=this.id2ij(in_str[1]);
            if(c1[0]!==-1&&c2[0]!==-1){
              var x=this.sum_cells(c1[0],c1[1],c2[0],c2[1]);
              if(x!==false){
                this.state.cList[i][j].FuncErr=false;
                this.state.cList[i][j].FuncValue=x;
                this.state.cList[i][j].FuncRef=[c1,c2];
              }
            }
          }
        }
      }
      else if(this.id2ij(new_str)[0]!==-1){
        var src=this.id2ij(new_str);
        this.state.cList[i][j].FuncErr=false;
        this.state.cList[i][j].FuncType="ref";
        this.state.cList[i][j].FuncValue=this.get_cell_value(src[0],src[1]);
        this.state.cList[i][j].FuncRef[0]=[src[0],src[1]];
      }
      else if(new_str.includes("+")||new_str.includes("-")){
        var sign="?";
        if(new_str.includes("+")) sign="+";
        else if(new_str.includes("-")) sign="-";
        var in_str=new_str.split(sign);        
        if(in_str.length == 2){                 
          var c=[this.id2ij(in_str[0]),this.id2ij(in_str[1])];
          var v=[NaN,NaN];
          for(let l=0;l<2;l++){
            if(c[l][0]===-1){
              if(in_str[l]===""){
                v[l]=0;
              }
              else if(this.isNumeric(in_str[l])){
                v[l]=parseFloat(in_str[l]);
              }
            }else{
              v[l]=this.get_cell_value(c[l][0],c[l][1]);
              this.state.cList[i][j].FuncRef[l]=[c[l][0],c[l][1]];
            }
          }
          if(!isNaN(v[0]) && !isNaN(v[1])){ //string
            if(v[0]=="") v[0]=0;
            if(v[1]=="") v[1]=0;
            if(!isNaN(parseInt(v[0]))&&!isNaN(parseInt(v[1]))){ //space
              if(sign==="+"){
                this.state.cList[i][j].FuncErr=false;
                this.state.cList[i][j].FuncType="+-";
                this.state.cList[i][j].FuncValue=parseFloat(v[0])+parseFloat(v[1]);
              }
              else if(sign==="-"){
                this.state.cList[i][j].FuncErr=false;
                this.state.cList[i][j].FuncType="+-";
                this.state.cList[i][j].FuncValue=parseFloat(v[0])-parseFloat(v[1]);
              }
            }
          }
        }
      }
    }
  }
  get_cell_value=(i,j)=>{
    this.parse_func(i,j,this.state.cList[i][j].content);
    if(this.state.cList[i][j].isFunc){
      if(this.state.cList[i][j].FuncErr)
        return "ERROR!"
      return this.state.cList[i][j].FuncValue;
    }
    else{
      return this.state.cList[i][j].content;
    }    
  }
  componentWillUpdate(nextProps, nextState){
    for(let t=0;t<2;t++){
      for(let i=0;i<this.state.row_num;i++){
        for(let j=0;j<this.state.col_num;j++){
          let s=this.ij2id(i,j);
          var fcs_in = document.getElementById(s);
          fcs_in.value=this.get_cell_value(i,j);
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
    var rows = [];
    var table = [];
    var arow = [];
    for (let j = 0; j < this.state.col_num; j++)
      arow=arow.concat((<th class={(j===this.state.fcs[1])? "fcs":""}>{Table.col_id2str(j)}</th>));
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
        {rows.map((e,index)=>{return <tr><th class={((index===this.state.fcs[0]+1)&&index!==0)? "fcs":""}>{(index===0)? "":index}</th>{e}</tr>})}          
        </table>
      </header >
    );
  }
}
export default Table;

