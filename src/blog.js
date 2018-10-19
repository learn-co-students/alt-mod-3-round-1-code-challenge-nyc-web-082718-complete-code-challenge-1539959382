class Blog{
  constructor(blogJson){
    this.id = blogJson.id
    this.title = blogJson.title
    this.authorId = blogJson.authorId
  }

  render(){
    return`
    <li data-blog-id="${this.id}">${this.title}</li>`
  }
}
