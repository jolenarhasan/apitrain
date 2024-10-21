
//هاي الطريقة بتعمل fetch وبترحعلي لداتا مع بعض
//بس الاحسن انه افصل بين انه اجيب الداتا وانه اضيفها ع المكان الي بدي اياه
//يعني ما اعمل كل المهمات بنفس الفنكشن
/*const getproduct=async()=>{
    const{data}=await axios.get('https://dummyjson.com/products');

   //const response =await fetch('https://fakestoreapi.com/products');
    //const data= await response.json();

    const result=data.products.map((product)=>
    `
    <div class="product">
    <h2>${product.title}</h2>
    <img src="${product.thumbnail}"/>
    </div>
    `
    ).join(" ") ;  

    document.querySelector('.products').innerHTML=result;
}*/
//هاد الفنكشن بجيب الداتا
const getdata=async (page=1)=>{
    const limit=20;
    const skip=(page-1)*limit;
    const{data}=await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
    console.log(data);
    return data;
}
//وهاد بحطها بالمكان الي بدي اعرضها فيه
const getproducts=async(page=1)=>{
    try{
    const data=await getdata();
    const totalPages=Math.ceil(data.total/data.limit);
    console.log(totalPages);
    const result=data.products.map((product)=>

        `
        <div class="product">
        <h2>${product.title}</h2>
        <img src="${product.thumbnail}"/>
        <a href='details.html?id=${product.id}'>details</a>
        <button onclick=deleteproduct(${product.id})>delete</button>
        </div>
        `
        ).join(" ") ;  
        document.querySelector('.products').innerHTML=result;

        let paginationlinks=``;
        if(page>1){
            paginationlinks+=` <li class="page-item"><button onclick=getproducts(${page-1}) class="page-link">&laquo;</button></li>`;
        }
        for(let i=1; i<=totalPages; i++){
            paginationlinks+=` <li class="page-item"><button onclick=getproducts(${i}) class="page-link">${i}</button></li>`;
        }
        if(page<totalPages){
            paginationlinks+=` <li class="page-item"><button onclick=getproducts(${page+1}) class="page-link" >&raquo;</button></li>`;
        }
        document.querySelector('.pagination').innerHTML=paginationlinks;
    }
    catch(error){
        const result=
        `<h2>error</h2>
        <p>${error.message}</p>`;
        document.querySelector('.products').innerHTML=result;
        
    }
    finally{
       
        document.querySelector('.overlay').classList.add('remove-overlay');
    }
}
async function deleteproduct(id){
    try{
    const {data}= await axios.delete(`https://dummyjson.com/products/${id}`);
    console.log(data);
    alert('Successfully deleted');
    location.href='index.html';
  //  window.location.reload();//The reload() method reloads the current document
}
    catch(error){
        console.log(error.message);
        alert('Error deleting');
    }
}

getproducts();

window.onscroll=function(){

    const nav=document.querySelector('nav');
    const about=document.querySelector('.about');
    if (window.scrollY>about.offsetTop){
        nav.classList.add('scrollnav');
    }
    else{
        nav.classList.remove('scrollnav');
    }
}