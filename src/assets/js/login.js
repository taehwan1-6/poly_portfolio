document.addEventListener("DOMContentLoaded", function() {
    var form = document.querySelector("form");
    var emailInput = document.getElementById("email");
    var passwordInput = document.getElementById("password");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        var email = emailInput.value;
        var password = passwordInput.value;

        if (email === "" || password === "") {
            var errorDiv = document.createElement("div");
            errorDiv.className = "alert alert-danger";

            if (email === "") {
                errorDiv.innerText = "이메일을 입력해주세요";
            } else {
                errorDiv.innerText = "비밀번호를 입력해주세요";
            }

    
            var errorContainer = document.getElementById("error-container");
            errorContainer.innerHTML = ""; 
            errorContainer.appendChild(errorDiv);

            return; 
        }

        fetch("assets/json/members.json")
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                var members = data.members;
                var state = false;

                for (var i = 0; i < members.length; i++) {
                    if (members[i].email === email && members[i].password === password) {
                        state = true;
                        break;
                    }
                }

                if (state) {
                    alert("로그인 성공");
                    window.location.href = "index.html";
                } else {
                    alert("로그인 실패");
                }
            })
            .catch(function(error) {
                console.error("JSON 파일 에러", error);
            });
    });
});