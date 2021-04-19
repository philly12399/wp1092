// TODO:
var input = document.getElementById("comment-input");
var combut = document.getElementById("comment-button");
var canbut = document.getElementById("cancel-button");
var combgrp = document.getElementById("comment-button-group");
var cnt = 1;
var comnum = document.getElementById("comment-num");
combgrp.style="display:none";
combut.disabled=true;
input.onclick=()=>{
    combgrp.style="";
}
input.addEventListener('input',(e)=>{
    if(input.value.trim() !== ""){
        combut.classList.add('comment-ing');
        combut.disabled=false;
    }
    else{
        combut.classList.remove('comment-ing');
        combut.disabled=true;
    }
})
combut.onclick=()=>{
    add_comment(input.value.trim().replace(/ /g, '\u00A0'));
    cnt++;
    comnum.textContent = cnt+"則留言";
    input.value="";
    combut.classList.remove('comment-ing');
    combut.disabled=true;
}
canbut.onclick=()=>{
    input.value="";
    combut.classList.remove('comment-ing');
    combut.disabled=true;
    combgrp.style = "display:none";
}
var comgrp = document.getElementById("comment-group");
var add_comment =(t)=>{
    //console.log(t);
    var a0 = comgrp.firstElementChild;
    var a1 = a0.cloneNode(true);
    var t0=a1.querySelector(".comment-text");
    //console.log(t0.textContent);
    t0.textContent = t;
    comgrp.appendChild(a1);
}