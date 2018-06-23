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
    stickyPositon: []
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
        let position = clone(data.sticky_position)
        position.forEach((value, index) => {
          value.forEach((value2, index2) => {
            if (value2) {
              let matchSticky = _.findWhere(data.sticky, {sticky_id: value2})
              position[index][index2] = (matchSticky) ? clone(matchSticky) : null
            }
          })
        })
        this.position = position
        this.board = data
      }
    });
    socket.emit('req-get-board', {board_id: this.boardId});

  },
  methods: {
    addSticky () {
      let stickyId = (new Date()).getTime()
      let position = clone(this.position)
      position.forEach((value, index) => {
        value.forEach((value2, index2) => {
          if (value2) {
            value2 = value2.sticky_id
          }
        })
      })
      position.push([stickyId])
      socket.emit('req-add-sticky', {board_id: this.boardId, sticky_data: {sticky_id: stickyId, title: '後醍醐天皇', background_color: '#FF0000', tag: '室町時代', position_x: 300, position_y: 300}, sticky_position: position});
    },
  boxClick:  function(item){
    console.log("test")
    this.message = "test"
  },
  dragstart (item,e) {
    this.draggingItem = item
    e.target.style.opacity = 0.5;
    e.pageY
  },
  dragend (item,e) {
    e.target.style.opacity = 1;
    console.log("x",e.pageX,"y",e.pageY)

    this.top = e.pageY - 120
    this.left = e.pageX

  },
  editBoardTitle () {
    title = ''
    if (title = window.prompt('ボード名の編集')) {
      socket.emit('req-edit-board-title', {board_id: this.boardId, board_title: title});
    }
  },
  editSticky (value) {
    title = ''
    if (title = window.prompt('ボード名の編集')) {
      value.title = title
      socket.emit('req-add-sticky', {board_id: this.boardId, sticky_data: value});
    }
  }
}
})
