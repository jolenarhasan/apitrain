const newProduct=document.querySelector("form");

newProduct.onsubmit=async function(event){
    event.preventDefault();
    const title=event.target.title.value;
    const price=event.target.price.value;
    //const elements=event.target.elements;
    //const title=elements['title'].value; ....
    try{
    const {data}=await axios.post(`https://dummyjson.com/products/add`,{title,price});
    console.log(data);
    alert('new product added');
    location.href='index.html';
}
catch(e){
    alert('error');
}
}