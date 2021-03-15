var imgs = ["https://wallpapercave.com/wp/wp3159847.jpg","https://wallpapercave.com/wp/MiUGm2d.jpg","https://wallpapercave.com/wp/wp2759873.jpg","https://wallpapercave.com/wp/wp2298417.jpg"]
var source = ["https://wallpapercave.com/best-lol-wallpapers","https://wallpapercave.com/lol-wallpapers-1920x1080","https://wallpapercave.com/w/wp2759873","https://wallpapercave.com/lol-xin-zhao-wallpaper"]
var previous = document.getElementById("previous");
var next = document.getElementById("next");
var display = document.getElementById("display")
var photo = document.getElementsByClassName("image-viewer__display")
var count = 1;
var flag_right = false
var flag_left = false

previous.addEventListener("click", function(){

                            //document.getElementById("bg").style.backgroundImage = 'url("./images/loading.gif")'
                            if (count === 0){
                                return
                            }

                            count -= 1;
                            photo[0].innerHTML=`<img src = ${imgs[count]} id="display" alt = "picture">
<div class="image-viewer__display-source-wrapper">
<span>
<p>
source:<a href= "${source[count]}">${source[count]}</a>
</p>
</span>
</div>
`;                          //console.log("aasa")
                            //window.alert("換上一張圖片")
                            //window.alert(count)
                            if (count === 0){
                                flag_left = true
                                previous.className="disabled"
                                previous.id = "next_disabled"
                            }
                            else if (flag_right === true){
                                flag_right = false;
                                next.className="image-viewer__button"
                                next.id="next"
                            }
                            //while(!(photo[0]).complete){}
                            //document.getElementById("bg").style.backgroundImage = 'none'
                        })
next.addEventListener("click", function(){
                            //document.getElementById("bg").style.backgroundImage = 'url("./images/loading.gif")'
                            if (count === imgs.length - 1){
                                return;
                                window.alert("There is no more")
                            }                        
                            count += 1;
                            photo[0].innerHTML=`<img src = ${imgs[count]} id="display" alt = "picture">
<div class="image-viewer__display-source-wrapper">
<span>
<p>
source:<a href= "${source[count]}">${source[count]}</a>
</p>
</span>
</div>
`
;
                            if (count === imgs.length - 1){
                                flag_right = true
                                next.className="disabled"
                                next.id = "next_disabled"
                            }
                            else if (flag_left === true){
                                flag_left = false;
                                previous.className="image-viewer__button"
                                previous.id="previous"
                            }
                            //while(!photo[0].complete){}
                            //window.alert("換下一張圖片")
                            //window.alert(count)
                        })

function finish(){
    document.getElementById("bg").style.backgroundImage = 'none'


}