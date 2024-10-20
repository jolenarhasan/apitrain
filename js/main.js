
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
const getdata=async ()=>{
    const{data}=await axios.get('https://dummyjson.com/products');
    return data;
}
//وهاد بحطها بالمكان الي بدي اعرضها فيه
const getproducts=async()=>{
    const data=await getdata();
    const result=data.products.map((product)=>
        `
        <div class="product">
        <h2>${product.title}</h2>
        <img src="${product.thumbnail}"/>
        <a href='details.html?id=${product.id}'>details</a>
        </div>
        `
        ).join(" ") ;  
    
        document.querySelector('.products').innerHTML=result;
    }

getproducts();