
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
    const data=await getdata(page);
    const totalPages=Math.ceil(data.total/data.limit);
    console.log(totalPages);
    console.log(page);
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

        const modal=document.querySelector(".myModal");
        const closebtn=document.querySelector('.closebtn');
        const rightbtn=document.querySelector('.rightbtn');
        const leftbtn=document.querySelector('.leftbtn');
        const allimages=Array.from(document.querySelectorAll("img"));
        //console.log(modal,modalcontent,closebtn,rightbtn,leftbtn,allimages);
        let currentIndex=0;
        rightbtn.addEventListener("click",()=>{
            currentIndex++;
            if(currentIndex>=allimages.length){
              currentIndex=0;
            }
            const nextImage=allimages[currentIndex].getAttribute("src");
            modal.querySelector('img').setAttribute('src',nextImage);
          });

          leftbtn.addEventListener("click",()=>{
            currentIndex--;
            if(currentIndex<0){
              currentIndex=allimages.length-1;
            }
            const prevImage=allimages[currentIndex].getAttribute("src");
            modal.querySelector('img').setAttribute('src',prevImage);
          });

        for(let i=0;i<allimages.length;i++){
            allimages[i].addEventListener("click",(e)=>{
                console.log(e.target.src);
                modal.classList.remove('d-none');
                modal.querySelector('img').setAttribute('src',e.target.src);
                const currentImage=e.target;
                currentIndex=allimages.indexOf(currentImage);
            });
        }
        closebtn.addEventListener("click",()=>{
            modal.classList.add('d-none');
        });
        document.addEventListener("keydown",(e)=>{
            if(e.code=='ArrowRight'){
                currentIndex++;
                if(currentIndex>=allimages.length){
                  currentIndex=0;
                }
                const nextImage=allimages[currentIndex].getAttribute("src");
                modal.querySelector('img').setAttribute('src',nextImage);
            }
            else if(e.code=='ArrowLeft'){
                currentIndex--;
                if(currentIndex<0){
                  currentIndex=allimages.length-1;
                }
                const prevImage=allimages[currentIndex].getAttribute("src");
                modal.querySelector('img').setAttribute('src',prevImage);
            }
            else if(e.code=='Escape'){
                modal.classList.add('d-none');
            }
        }
        )
        document.addEventListener('click',(e)=>{
            if(e.target==modal){
                modal.classList.add('d-none');
            }
        })
        
    } catch(error){
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
}/*
//هدول خطا احطهم هون لانه كل الصور بيجو من فنكشن دسبلاي مش ثابتات بالhtml
const modal=document.querySelector(".myModal");
const modalcontent=document.querySelector(".modal-content");
const closebtn=document.querySelector('.closebtn');
const rightbtn=document.querySelector('.rightbtn');
const leftbtn=document.querySelector('.leftbtn');
const allimages=document.querySelectorAll("img");
console.log(modal,modalcontent,closebtn,rightbtn,leftbtn,allimages);*/