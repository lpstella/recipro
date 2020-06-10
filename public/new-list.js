function submitList() {
    let createJson = {
        "list_name" : null,
        "privacy_status" : null,
        "user_id" : null
    };
    createJson.list_name = document.getElementById("list_name").value;
    createJson.privacy_status = 0;
    if (document.getElementById("private_list").checked == true) {
        createJson.privacy_status = 1;
    }

    if (createJson.list_name != null && createJson.privacy_status != null){
        let req = new XMLHttpRequest();

        req.onreadystatechange = () => {
            if (this.status === 200 && this.readyState === 4) {
                this.value = "Submitted";
            }
        }

        req.open("POST", "/list");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.send(JSON.stringify(createJson));

        window.location.assign("/profile");
    } else {
        alert("Missing required fields!");
    }
}
