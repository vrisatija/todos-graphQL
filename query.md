mutation{
  addTodo(title:"shopping",description:"buy lemon"){
    title,
    description
  }
}


{
  todo(id:"3"){
    title
    description
  }
}


{
  todos{
    id
    title
    description
  }
}

