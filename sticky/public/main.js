let getUrllets = function(){
  let lets = {}; 
  let param = location.search.substring(1).split('&');
  for(let i = 0; i < param.length; i++) {
    let keySearch = param[i].search(/=/);
    let key = '';
    if(keySearch != -1) key = param[i].slice(0, keySearch);
    let val = param[i].slice(param[i].indexOf('=', 0) + 1);
    if(key != '') lets[key] = decodeURI(val);
  } 
  return lets; 
}

let clone = (object) => {
  return JSON.parse(JSON.stringify(object))
}

let socket = io.connect('http://163.44.171.245:18000');
socket.on("connect", function() {
  console.log('connected');
});

const POSITION_MAX_COLUMN = 5
const POSITION_MAX_ROW= 5

new Vue({
  el: '#container',
  data: {
    message: 'ここにテキストが入ります',
    isActive: false,
    top: 0,
    left: 0,
    board: {},
    boardId: null,
    position: [],
    stickyPositon: [],
    sticky_data:{},
    offsetX:0,
    offsetY:0,
    stickySize:{x:200,y:200}
  },
  mounted () {
    this.boardId = getUrllets().board_id
    if (!this.boardId) {
      location.href = '/'
      return
    }
    console.log('on')
    socket.on('res-get-board', (data) => {
      console.log('Get Board', data);
      if (data.board_id == this.boardId) {
        let position = []
        for (let i = 0; i < POSITION_MAX_ROW; i++) {
          position[i] = []
          for (let j = 0; j < POSITION_MAX_COLUMN; j++) {
            position[i][j] = null
          }
        }
        data.sticky_position.forEach((value, index) => {
          value.forEach((value2, index2) => {
            if (value2) {
              let matchSticky = _.findWhere(data.sticky, {sticky_id: value2})
              position[index][index2] = (matchSticky) ? clone(matchSticky) : null
            }
          })
        })
        console.log(position)
        this.position = position
        this.board = data
      }
    });
    socket.emit('req-get-board', {board_id: this.boardId});

  },
  methods: {
    addSticky (backgroundColor) {
      let stickyId = (new Date()).getTime()
      let position = this.formatPosition(clone(this.position))

      let breakFlg = false
      for (let i = 0; i < POSITION_MAX_ROW; i++) {
        if (breakFlg) break
        for (let j = 0; j < POSITION_MAX_COLUMN; j++) {
          if (!position[i][j]) {
            position[i][j] = stickyId
            breakFlg = true
            break
          }
        }
      }

      socket.emit('req-add-sticky', {board_id: this.boardId, sticky_data: {sticky_id: stickyId, title: '', background_color: backgroundColor, tag: '', position_x: 0, position_y: 0, reaction: {good: 0}}, sticky_position: position});
    },
  activeSticky:  function(item){
    item.title = "test"
    if(item.isActive){
        item.isActive = false;
    }else{
        item.isActive = true;
    }
  },
  getPosison(item){
      console.log(item)
    return {x:item.position_x * this.stickySize.x, y:item.position_y * this.stickySize.y }
  }, 
  dragstart (item, e) {
    this.draggingItem = item
    this.offsetx = e.layerX;
    this.offsety = e.layerY;
    console.log("x",e.offsetX ,"y",e.offsetY)
    console.log("Positon",this.position)
    
    // this.position[item.position_y][item.position_x] = null
    
  },
  dragend (item, e) {
    
    this.position[item.position_y][item.position_x] = null
    e.target.style.opacity = 1;
    let board_obj = document.getElementById("board-area")
    let board_size = board_obj.getBoundingClientRect()
    next_position = {"x":e.pageX - this.offsetX,
    "y":e.pageY - this.offsetY - (window.pageYOffset + board_size.top)}
    next_position = this.convertPosition(next_position)
    item.position_x = Math.round(next_position.x/this.stickySize.x) 
    item.position_y = Math.round(next_position.y/this.stickySize.y)
    this.position[item.position_y][item.position_x] = item.sticky_id
    
    console.log("item",item)
    // console.log("this",this.board)
    console.log("Positon",this.position)
    // console.log("sticky_id",item.sticky_id)
    socket.emit('req-edit-sticky-position', {board_id: this.boardId, sticky_position: this.position});
  },
  editBoardTitle () {
    title = ''
    if (title = window.prompt('ボード名の編集')) {
      socket.emit('req-edit-board-title', {board_id: this.boardId, board_title: title});
    }
  },
  changeStickyTitle (value) {
    socket.emit('req-add-sticky', {board_id: this.boardId, sticky_data: value});
  },  
  goodSticky (value) {
    if (value.reaction.good >= 100) return
    value.reaction.good += 1
    socket.emit('req-add-sticky', {board_id: this.boardId, sticky_data: value});
  },  
  ungoodSticky (value) {
    if (value.reaction.good <= 0) return
    value.reaction.good -= 1
    socket.emit('req-add-sticky', {board_id: this.boardId, sticky_data: value});
  },  
  changeStickyBackgroundColor (value, color) {
    value.background_color = color
    console.log(value.background_color)
    socket.emit('req-add-sticky', {board_id: this.boardId, sticky_data: value});
  },  
  removeSticky (stickyId) {
    let position = this.formatPosition(clone(this.position))
    let breakFlg = false
    for (let i = 0; i < POSITION_MAX_ROW; i++) {
      if (breakFlg) break
      for (let j = 0; j < POSITION_MAX_COLUMN; j++) {
        if (position[i][j] && position[i][j].sticky_id === stickyId) {
          position[i][j] = null
          breakFlg = true
          break
        }
      }
    }
    socket.emit('req-remove-sticky', {board_id: this.boardId, sticky_id: stickyId, sticky_position: position});
  },  
  convertPosition (pos){
    let next_position = {x: (pos.x-(this.stickySize.x/2))/this.stickySize.x, y: (pos.y-(this.stickySize.y/2))/this.stickySize.y}
    next_position = {x:(Math.round(next_position.x)*this.stickySize.x),
                y:(Math.round(next_position.y)*this.stickySize.y)}
    return next_position
  },
  formatPosition (position) {
    for (let i = 0; i < POSITION_MAX_ROW; i++) {
      for (let j = 0; j < POSITION_MAX_COLUMN; j++) {
        if (position[i][j]) position[i][j] = position[i][j].sticky_id
      }
    }
    return position
  }
}
})
