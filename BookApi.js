
let b1 = document.getElementById("b1")
let b2 = document.getElementById("b2")
let b3 = document.getElementById("b3")
let b4 = document.getElementById("b4")
let b7 = document.getElementById("b7")

function bookDetails(data) {
  const body = document.body
  for (let i = 0; i <= data.length; i++) {
    const id = JSON.stringify(data[i].id)
    const name = JSON.stringify(data[i].name)
    const type = JSON.stringify(data[i].type)
    body.append(document.createElement("br"))
    body.append(id, ".name : ", name, ",", " ", "type : ", type)
    body.append(document.createElement("br"))
  }
}

function getListOfBooks() {
  fetch('http://localhost:9000/get')
    .then((response) => {
      console.log(response)
      return response.json()
    })
    .then((data) => { return JSON.parse(data) }).then((data) => {
      console.log(data);

      bookDetails(data)
    }
    );
}

b2.addEventListener('click', getListOfBooks)

function postBooks() {
  let i1 = document.getElementById("i1").value
  let i2 = document.getElementById("i1.2").value
  let i3 = document.getElementById("i2").value
  const data = { id: i1, name: i2, type: i3 }
  param = { method: 'Post', headers: { 'Content-Type': 'application/json',"Authorization":"Bearer"+data.access_token}}
  fetch('http://localhost:9000/post', param,{body:JSON.stringify(data),success:function(data,status){
    localStorage.setItem('token',data.token)
  }})
    .then((response) => {
      console.log(response)
      return response.json()
    })
    .then((jsn) => { return JSON.parse(jsn) }).then((jsn) => {
      console.log(jsn)

      bookDetails(jsn)
    })
}
b1.addEventListener('click', postBooks)

function update() {
  let i1 = document.getElementById("i1").value
  let i2 = document.getElementById("i1.2").value
  let i3 = document.getElementById("i2").value
  const data2 = { id: i1 - 1, name: i2, type: i3 }
  fetch('http://localhost:9000/1', { method: 'PUT', headers: { 'Content-Type': 'application/json',"Authorization":"Bearer${token}"}, body: JSON.stringify(data2) })
    .then(response => {
      console.log(response)
      return response.json()
    })
    .then((jsn) => { return JSON.parse(jsn) }).then((jsn) => {
      console.log(jsn)
      bookDetails(jsn)
    })
}
b3.addEventListener('click', update)

function sendDetails() {
  var i3 = document.getElementById("i3").value
  var i4 = document.getElementById("i4").value
  const details = { usrid: i3, pass: i4 }
  param = { method: 'Post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(details) }
  fetch('http://localhost:9000/api-clients/signup', param)
    .then((response) => {
      console.log(response)
      return response.text()
    })
    .then((data) => {
      console.log(data)
    })
}
b4.addEventListener('click',sendDetails)

function login() {
  var i3 = document.getElementById("i3").value
  var i4 = document.getElementById("i4").value
  const det = { usrid: i3, pass: i4}
  param = { method: 'Post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(det) }
  fetch('http://localhost:9000/api-clients/signin', param)
    .then((response) => {
      console.log(response)
      return response.json()
    })
    .then((data) => {
      console.log(data.access_token)

    })
}
b7.addEventListener('click',login)


