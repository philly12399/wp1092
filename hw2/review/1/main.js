// utility functions
function add_class(elem, new_class_name){
	elem.classList.add(new_class_name)
}
function remove_class(elem, removed_class_name){
	elem.classList.remove(removed_class_name)
}
function change_source(s, link){
	s.href = link
	s.text = link
}


// images
var image_sources = [
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3Ev_SYX2v54ar5N1SsVvbVc0P5-Z1eIBaSA&usqp=CAU',
	'https://images-na.ssl-images-amazon.com/images/I/715BBBXdWnL._AC_SL1100_.jpg',
	'https://popjunkielondon.files.wordpress.com/2017/08/oasis.jpg',
	'https://i.pinimg.com/originals/bc/85/18/bc851879d98f3389cf38141b256abfb9.jpg',
	'https://img.discogs.com/FbM7ttr1sD5AaTYDBVlrmtVdPkU=/fit-in/600x596/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-6424443-1418882461-4095.jpeg.jpg',
	'https://lineimg.omusic.com.tw/img/album/3880741.jpg?v=20210211160011',
	'https://images-na.ssl-images-amazon.com/images/I/81AbK5IlsuL._SL1500_.jpg',
]
var source = document.getElementById('source')


// display
var display = document.getElementById('display')
var curr_pos = 0
display.src = image_sources[curr_pos]
var img_index = document.getElementById('img_index')


// buttons
var btn_prev = document.getElementById('previous')
var btn_next = document.getElementById('next')


// States (for en/dis-abling buttons)
const FIRST = 0, LAST = 1, OTHER = 2, ONLY_ONE = 3
var STATE = FIRST

var disabled = 'disabled'



// functions
function next_image(){
	if (STATE != LAST && STATE != ONLY_ONE){
		display.src = './images/loading.gif'
		display.src = image_sources[++curr_pos]
		change_source(source, image_sources[curr_pos])
		img_index.innerHTML = String(curr_pos + 1) + '/' + String(image_sources.length)
		if (curr_pos == 1){
			// left the first image
			STATE = OTHER
			remove_class(btn_prev, disabled)
		}
		if (curr_pos == image_sources.length - 1){
			// reached the last image
			STATE = LAST
			add_class(btn_next, disabled)
		}
	}
}

function previous_image(){
	if (STATE != FIRST && STATE != ONLY_ONE){
		display.src = 'images/loading.gif'
		display.src = image_sources[--curr_pos]
		change_source(source, image_sources[curr_pos])
		img_index.innerHTML = String(curr_pos + 1) + '/' + String(image_sources.length)
		if (curr_pos == image_sources.length - 2){
			// left the last image
			STATE = OTHER
			remove_class(btn_next, disabled)
		}
		if (curr_pos == 0){
			// reached the first image
			STATE = FIRST
			add_class(btn_prev, disabled)
		}
	}
}


// check when loading the page first time
function check(){
	if (image_sources.length == 1){
		// only one image
		STATE = ONLY_ONE
		add_class(btn_prev, disabled)
		add_class(btn_next, disabled)
	} else if (curr_pos == 0){
		STATE = FIRST
		add_class(btn_prev, disabled)
	} else if (curr_pos == image_sources.length - 1){
		STATE = LAST
		add_class(btn_next, disabled)
	} else {
		STATE = OTHER
	}
	source.href = image_sources[curr_pos]
	source.text = image_sources[curr_pos]
	img_index.innerHTML = String(curr_pos + 1) + '/' + String(image_sources.length)
}
check()
