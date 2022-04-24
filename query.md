add todo
mutation{
  addTodo(title:"shopping",description:"buy lemon"){
    title,
    description
  }
}


view todo
{
  todo(id:"3"){
    title
    description
  }
}


view todos
{
  todos{
    id
    title
    description
  }
}



delete todo
mutation{
  deleteTodo(id:8){
    id
    title
    description
  }
}




update todo
mutation{
  updateTodo(id:9,title:"vri",description:"gfvghgj"){
    id
    title
    description
  }
}

