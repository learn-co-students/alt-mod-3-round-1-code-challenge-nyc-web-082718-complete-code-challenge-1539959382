document.addEventListener('DOMContentLoaded', () => {
  const authorLists = document.getElementById('author-select')
const blogContainer =document.getElementById('blog-container')
const commentContainer = document.getElementById('comment-container')
  console.log('%c DOM successfully loaded and parsed!', 'color: firebrick')
  blogContainer.addEventListener('click',e=>{

    if(e.target.tagName === "LI"){
      let blogId =e.target.dataset.blogId
      fetch(`http://localhost:3000/blogPosts/${blogId}?_embed=comments`)
        .then(res=> res.json())
        .then(resJson =>{
          commentContainer.innerHTML = null
          resJson.comments.forEach(comment=>{
            let newCommet =new Comment(comment)
            commentContainer.innerHTML += newCommet.render()
          })
        })
        .then(()=>{

          commentContainer.addEventListener('click',e=>{
            if(e.target.tagName === "BUTTON"){
              let commentId=e.target.dataset.id
              console.log(commentId)
              e.target.parentNode.remove()
              fetch(`http://localhost:3000/comments/${commentId}`,{
                method:'DELETE'
              })
            }
          })
        })
    }

  })

  authorLists.onchange=changeEventHandler;
},false);


function changeEventHandler(event) {
  // You can use “this” to refer to the selected element.
  const blogContainer =document.getElementById('blog-container')
  blogContainer.innerHTML = null
  let authorId =event.target.value
  fetch(`http://localhost:3000/authors/${authorId}?_embed=blogPosts`)
    .then(res=> res.json())
    .then(resJson=> {
      resJson.blogPosts.forEach(blog=> {
        let newBlog = new Blog(blog)
        blogContainer.innerHTML += newBlog.render()
      })
    })

  }
