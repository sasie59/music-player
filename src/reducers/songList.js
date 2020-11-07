import {
  IS_LIKE
} from 'musicPlayer_1/actions/songList';

const initial = [
  {id: 1, 'singer': '五月天', 'seconds': 3, 'isLike': true, 'name': '溫柔' },
  {id: 2, 'singer': '五月天', 'seconds': 3, 'isLike': false, 'name': '你不是真正的快樂' },
  {id: 3, 'singer': '五月天', 'seconds': 3, 'isLike': true, 'name': '擁抱' },
  {id: 4, 'singer': '五月天', 'seconds': 3, 'isLike': false, 'name': '志明與春嬌' },
  {id: 5, 'singer': '五月天', 'seconds': 3, 'isLike': true, 'name': '突然好想你' },
  {id: 6, 'singer': '五月天', 'seconds': 3, 'isLike': false, 'name': '軋車' },
  {id: 7, 'singer': '五月天', 'seconds': 3, 'isLike': true, 'name': '終結孤單' },
  {id: 8, 'singer': '五月天', 'seconds': 3, 'isLike': false, 'name': '一顆蘋果' },
  {id: 9, 'singer': '五月天', 'seconds': 3, 'isLike': true, 'name': '人生有限公司' },
];

  export default function songList( state = initial,action) {
    switch(action.type){
      case IS_LIKE:
        const newState = [...state];
        newState[action.index].isLike = !newState[action.index].isLike;
        return newState;
        // slice的寫法 你會怎麼寫 我想背起來
      default:
        return state;
    }
  }