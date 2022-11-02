console.log('This is Ajax Demo')

let fetchBtn=document.getElementById('fetchBtn');
fetchBtn.addEventListener('click',fetchFun)

function fetchFun()
{
    console.log('you have clicked Fetch Button')

    //instantiate an xhr object
    const xhr=new XMLHttpRequest()

    //open the object
    xhr.open('GET','https://jsonplaceholder.typicode.com/todos/1',true)

    //what to do on progress
    xhr.onprogress=function(){
        console.log('On Progress')
    }

    //determining ready state
    xhr.onreadystatechange=function(){
        console.log('Ready state is : ',xhr.readyState)
    }

    // what to do on load
    xhr.onload=function(){
        if(this.status==200)
        {
        console.log(this.responseText)
        }
        else
        {
            console.log('Some Error Occured')
        }
    }

    //lastly to send get request
    xhr.send();

    console.log('We are Done')
}
let popBtn=document.getElementById('popBtn');
popBtn.addEventListener('click',popFun)

function popFun()
{
    console.log('you have clicked Populate Button')

    //instantiate an xhr object
    const xhr=new XMLHttpRequest()

    //open the object
    xhr.open('POST','https://dummy.restapiexample.com/api/v1/create',true)
    xhr.getResponseHeader('Content‐type','application/json');

    //what to do on progress
    xhr.onprogress=function(){
        console.log('On Progress')
    }

    // what to do on load
    xhr.onload=function(){
        if(this.status==200)
        {
        console.log(this.responseText)
        }
        else
        {
            console.log('Some Error Occured')
        }
    }

    //lastly to send get request
    param='   {"name":"ashish","salary":"2","age":"2"}'
    xhr.send(param);

}