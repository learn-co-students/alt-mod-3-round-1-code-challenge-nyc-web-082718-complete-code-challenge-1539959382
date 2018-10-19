document.addEventListener('DOMContentLoaded', () => {

  const authorContainer = document.getElementById("author-container")
  const blogContainer = document.getElementById("blog-container")
  // const authorDropdown = document.querySelector('select[name="author-list"]').onchange=changeEventHandler;
  const commentContainer = document.getElementById("comment-container")

  let arr = [];

  // function changeEventHandler(event) {
  //   // You can use “this” to refer to the selected element.
  //   if(!event.target.value) {
  //     alert('Select Author');
  //   }

    // else {

      fetch(`http://localhost:3000/authors/1?_embed=blogPosts`)
        .then((response) => {
          return response.json()
        })
        .then((authorObj) => {
          arr = authorObj
          authorContainer.innerHTML = `<div id="author-container">
                                          <h4 id="author-name">${arr.name}</h4>
                                          <h3 id="${arr.id}">${arr.blogName}</h3>
                                        </div>`


          arr.blogPosts.forEach((post) => {
            blogContainer.innerHTML += `<ul id="blog-container">
                                          <li data-id="${post.id}">${post.title}</li>
                                        </ul>`
          })
        }) //end of my second then


        document.addEventListener("click", function(event) {
          if(event.target.tagName === "H3") {

            let blogPostId = parseInt(event.target.id) //find the blog post id to hit
            let commentList = [] //new list to hold comment array

            fetch(`http://localhost:3000/blogPosts/${blogPostId}?_embed=comments`)
              .then((response) => {
                return response.json()
              })
              .then((commentObj) => {
                commentList = commentObj
                commentList.comments.forEach((comment) => {
                commentContainer.innerHTML += `<ul id="comment-container">
                                                  <li>
                                                    ${comment.content}
                                                    <button data-id="${comment.id}">Delete</button>
                                                  </li>
                                                </ul>`
                })
              }) //end of second then function


              document.addEventListener("click", function(event) {
                let deleteButtonId = event.target.dataset.id

                let deleteComment = event.target.parentNode.innerHTML = ""

                fetch(`http://localhost:3000/comments/${deleteButtonId}`, {
                  method: 'DELETE',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    comment: deleteComment
                  })
                })


              }) //end of event listener
          }//end of ifstatement
        })



    // } //end of else statement

})// end of eventHander
