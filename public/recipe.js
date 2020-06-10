const displayDifficulty = (e, rating) => {
    console.log('test');   
    const icon = document.createElement('img');
    for(let i = 0; i < rating; i++){
        this.parent.appendChild(icon);
    }
}

postComment = () => {
    let commentBody = document.getElementById('comment-box').value;
    alert("CLICKED " + commentBody);

}

window.addEventListener('DOMContentLoaded', function () {     // Add button event listeners inside of here to be loaded after all of the dom content
    document.getElementById('submit-comment').addEventListener('click', postComment);

});