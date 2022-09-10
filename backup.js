const Author = document.getElementById("author")
const Title = document.getElementById("title")
const Content = document.getElementById("content")
const button =  document.getElementById("button")
const posts =  document.getElementById("posts")

//deleteAll()

const nickName = JSON.parse(localStorage.getItem("nickname")) 

     nickName? Author.value = nickName : ""


button.addEventListener("click", ()=>{grabValues(); 
    setTimeout(()=>{location.reload()}, 1000)})

Content.addEventListener("keydown", (e)=>{if(e.key==="Enter")
{grabValues(); 
    setTimeout(()=>{location.reload()}, 1000)}
})


function grabValues(){

    if(Author.value.trim()!=="" &&  Content.value.trim()!==""){
        let id = ()=>  {return Math.floor(Math.random() * 1000000000000000)}
        
         const obj = {id:`${id()}`, author:`${Author.value}`, content:`${Content.value}`}
        console.log(obj)

        localStorage.setItem("nickname", JSON.stringify(Author.value))

            fetch("https://laszej-server.herokuapp.com/posts",

            {method: "POST",
             headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(obj)})
            }
     
     if(Author.value.trim()==="" ||   Content.value.trim()===""){
        Content.innerHTML = "Proszę wypełnić wszystkie pola"

     }
      Content.value=""
     
}


const deleteItem = (id)=> {
    fetch(`https://laszej-server.herokuapp.com/posts/${id}`,{method: "DELETE"} )}

    async function deleteAll (){
    const req  = await fetch(`https://laszej-server.herokuapp.com/posts/`)
    const data = await req.json()
    console.log(data)
    const filtered = data.filter((item)=> {return item.id>1})
        console.log(filtered)
        filtered.forEach((item)=>
        fetch(`https://laszej-server.herokuapp.com/posts/${item.id}`,{method: "DELETE"}))

 }
 
 

//deleteAll()


async function fetchData() {
	const response = await fetch("https://laszej-server.herokuapp.com/posts");
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }
      console.log(response.status)

	const data = await response.json();
   
    return data
}

async function showData(){
    const data = await fetchData()
    console.log(data)
    data.forEach((item, index)=>{
    let box = document.createElement("div")
    box.setAttribute("class", "pudełko")
    let author = document.createElement("p")
    author.innerHTML =`Autor wiadomości:  <br><br> ${item.author}`
    let comment = document.createElement("p")
    comment.innerHTML = `Treść wiadomości: <br><br> ${item.content}`
    box.append(author, comment)
    posts.append(box)


})

 
}

showData()



