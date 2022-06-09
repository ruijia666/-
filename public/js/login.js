window.onload=()=>{
    let falg1 = false
    let falg2 = false
    //document方法
function $(x) {
let m = x.split("");
if (m[0] == ".") {
  let n = m.slice(1);
  n = String(n);
  z = n.replace(/,/g, "");
  return document.getElementsByClassName(z)[0];
}
if (m[0] != ".") {
  return document.getElementById("x");
}
}
//判断汉字
$('.input1').onmouseleave=()=>{
   
let reg = /^[\u4E00-\u9FA5]+$/

if (reg.test($('.input1').value)){
    $('.error1').textContent = `&#xe8ad;此名字可以使用`
    $('.error1').style.color = 'green'
    falg1 = true
}else{
    $('.error1').textContent = `&#xe613;抱歉请输入汉字`
    $('.error1').style.color = 'red'
    falg1 = false
}
}

//判断两次密码是否一致
$('.input3').onmouseleave=()=>{
    if($('.input3').value==''){
    $('.error3').textContent = `&#xe613;请输入密码不能空`
    $('.error3').style.color = 'red'
}else{
    $('.input4').onmouseout=()=>{
    if($('.input3').value == $('.input4').value){
    $('.error3').textContent = `&#xe8ad;密码可以使用`
    $('.error4').textContent = `&#xe8ad;密码可以使用`
    $('.error3').style.color = 'green'
    $('.error4').style.color = 'green'
    falg2 = true
}else{
    $('.error3').textContent = `&#xe613;两次密码不一致请修改`
    $('.error4').textContent = `&#xe613;两次密码不一致请修改`
    $('.error3').style.color = 'red'
    $('.error4').style.color = 'red'
}
}
}
}
//    $('.sign').onmouseenter=()=>{
 
//     if(!falg1&&falg2){
//         $('.sign').onclick=()=>{
//             alert('不能为空')
//         }
//         $('.sign').type = 'button'
//     }else{
//         $('.sign').type = 'submit'
//     }
//    }

}


$('.sign').onclick=()=>{
    //important
    name = $('.input1').value
    pid = $('.input2').value
    password1 = $('.input3').value
    password2 = $('.input4').value
   info={
    name,
    pid,
    password1,
    password2
}


const Logfun = async () => {
try {
  const res = await Ajax(
    'post','http://127.0.0.1:3000/api/login/save',info
  );
  if(res.status == 1 ){
      alert('注册成功了')
      window.location.href='index.html'
  }
  if(res.status == 0){
    alert(`${res.message }`)
  }
  if(res.status == 3){
    alert(`注册失败`)
  }
} catch (error) {
  console.log(error);
}
};
Logfun()
}

$('.back').onclick =()=>{
    window.location.href='index.html'
}