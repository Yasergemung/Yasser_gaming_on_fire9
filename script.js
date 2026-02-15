/* الوضع المظلم والفاتح */

function toggleMode(){

let body = document.body;

if(body.classList.contains("light")){
body.classList.remove("light");
localStorage.setItem("mode","dark");
}else{
body.classList.add("light");
localStorage.setItem("mode","light");
}

}

/* حفظ الوضع */
if(localStorage.getItem("mode") === "light"){
document.body.classList.add("light");
}

/* تسجيل الدخول */

function login(){

let user = document.getElementById("user").value;
let pass = document.getElementById("pass").value;

if(user === "yasser" && pass === "1234"){
localStorage.setItem("role","admin");
window.location="dashboard.html";
return;
}

if(user && pass){
localStorage.setItem("role","user");
window.location="index.html";
}

}

/* التعليقات */

let comments = JSON.parse(localStorage.getItem("comments")) || [];

function save(){
localStorage.setItem("comments", JSON.stringify(comments));
}

function showComments(){

let box = document.getElementById("commentsBox");
if(!box) return;

box.innerHTML="";

comments.forEach((c,i)=>{

box.innerHTML += `
<div class="comment">
<b>${c.name}</b>
<p>${c.text}</p>

<button onclick="like(${i})">👍 ${c.likes}</button>

${localStorage.getItem("role")==="admin"
? `<button onclick="del(${i})">🗑</button>` : ""}

</div>
`;

});

}

function addComment(){

let name=document.getElementById("name").value;
let text=document.getElementById("text").value;

if(!name || !text) return;

comments.push({name,text,likes:0});
save();
showComments();

}

function like(i){
comments[i].likes++;
save();
showComments();
}

function del(i){
comments.splice(i,1);
save();
showComments();
}

/* لوحة التحكم */

function clearComments(){
localStorage.removeItem("comments");
alert("تم حذف كل التعليقات");
}
