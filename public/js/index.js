$('.sign').onclick = ()=>{
    pid = $('.id').value
    password = $('.password').value
     info={
      pid,
      password
  }
  // window.location.href = '/views/layout.html'
  const Signfun = async () => {
  try {
    const res = await Ajax(
      'post','http://127.0.0.1:3000/api/sign',info
    );
    console.log(res);
    if(res.status == 1 ){
        alert(`欢迎${res.name}`)
      
        localStorage.setItem('token', res.token);

        window.location.href='layout.html'
    }
    if(res.status == 0){
      alert(`${res.message}`)
    }
    
  } catch (error) {
    console.log(error);
  }
};
Signfun()
}
// $('.visited').onclick=()=>{
//   const Visfun = async()=>{
//     try{
//       const res = await Ajax('post','http://127.0.0.1:3000/api/visit')
//       if(res.status==1){
//         alert('无效session')
//       }else if(res.status ==0){
//         console.log(res);
//         alert(`欢迎${ res.username }
//               状态是${ res.msg }`)
//               window.location.href='layout.html'
//       }
//     } catch(error){
//       console.log(error);
//     }
//   }
//   Visfun()
// }
// /api/token
$('.token').onclick=()=>{
  
  const Tokfun = async()=>{
    try{
      const res = await Ajax2('post','http://127.0.0.1:3000/admin/token',localStorage.getItem('token'))
      console.log(res);
      if(res.status==0){
        window.location.href='layout.html'
        alert(res.msg)

      }
      else{
        alert(res.message)
      }
    } catch(error){
      console.log(error);
    }
  }
  Tokfun()
}



$('.login').onclick=()=>{
  window.location.href='login.html'
}