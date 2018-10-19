class Comment{
  constructor(commentJson){
    this.id = commentJson.id
    this.content = commentJson.content
    this.blogPostId = commentJson.blogPostId
  }
  render(){
    return `
    <li>
    ${this.content}
    <button class="delete" data-id="${this.id}">Delete</button>
    </li>`
  }
}
