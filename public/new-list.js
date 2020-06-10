
$(document).ready(function() {
    $(document).on("click", "#submitList" , function() {

        let createJson = {
            "list_name" : null,
            "privacy_status" : null,
            "user_id" : null
        };

        createJson.list_name = document.getElementById("list-name").value;
        console.log(createJson.list_name);

        let private = 0;
        if (document.getElementById("private-list").checked == true) {
            private = 1;
        }
        createJson.privacy_status = private;

        /*
        Need to do
        JSON.prep_time we don't have this anywhere on the page
        JSON.image && IMPLEMENT INTO DATABASE
        */

        if (createJson.list_name != null && createJson.privacy_status != null){
            let req = new XMLHttpRequest();

            req.onreadystatechange = () => {
                if (this.status === 200 && this.readyState === 4) {
                    this.value = "Submitted";
                }
            }

            req.open("POST", "/submit-list");
            req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            req.send(JSON.stringify(createJson));

            // Prevent resubmitting
            this.disabled = true;
            this.value = "Working..."
        } else {
            alert("Missing required fields!");
        }
    });
}
