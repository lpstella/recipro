const displayDifficulty = (e, rating) => {
    console.log('test');   
    const icon = document.createElement('img');
    for(let i = 0; i < rating; i++){
        this.parent.appendChild(icon);
    }
}

postComment = () => {
    document.getElementById('submit-comment').disabled = true;
    let commentBody = document.getElementById('comment-box').value;
    let rating = document.getElementsByClassName('comment-ratings');
    if (commentBody === '' || rating[0].value === '' || rating[1].value === '') {
        alert("Missing field!");
        return;
    }
    i = 0;
    do {
        if (rating[i].value > 5) {
            rating[i].value = 5;
        } else if (rating[i].value < 1) {
            rating[i].value = 1;
        }
        i++
    } while (i != 2);;
    let comment = {
        "comment_body": commentBody,
        "recipe_rating": rating[1].value,
        "recipe_difficulty": rating[0].value,
        "recipe_id": window.location.pathname.replace('/recipe/', ''),
    };
    console.log(JSON.stringify(comment));

    var req = new XMLHttpRequest();
    req.open("POST", "/comment");
    req.onreadystatechange = () => {
        if (req.status === 200 && req.readyState === 4) {
            window.location.reload();
        }
    }
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.send(JSON.stringify(comment));
}

window.addEventListener('DOMContentLoaded', function () {     // Add button event listeners inside of here to be loaded after all of the dom content
    document.getElementById('submit-comment').addEventListener('click', postComment);
});
