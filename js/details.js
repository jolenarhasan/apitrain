
//console.log(window)//objecبرجعلي كلشي بالجافاسكريبت
//من ضمن الاشياء الي برجعها الlocation
//اشياء الها علاقة باللينك تاعي

const getdetails=async()=>{
    const params=new URLSearchParams(window.location.search);
    const id=params.get('id');
    console.log(id);
    const {data} = await axios.get(`https://dummyjson.com/products/${id}`);
    return data;

}
const displaydetails=async()=>{
    try{
    const data= await getdetails();
    console.log(data);
    const result=`
    <h2>${data.title}</h2>
    <p>about this product: ${data.description}</p>
    <span>price: ${data.price}</span>
    `;
    const images=data.images.map((img)=>{
        return `<img src='${img}'/>`;
    }).join(' ');
    document.querySelector('.container .product').innerHTML=result;
    document.querySelector('.container .images').innerHTML=images;
    }
    catch(error){
        const result=
        `<h2>error</h2>
        <p>${error.message}</p>`;
        document.querySelector('body').innerHTML=result;
        
    }
    finally{
       
        document.querySelector('.overlay').classList.add('remove-overlay');
    }
}
displaydetails();