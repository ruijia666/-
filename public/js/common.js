function $(x) {
  let m = x.split("");
  if (m[0] == ".") {
    let n = m.slice(1);
    n = String(n);
    z = n.replace(/,/g, "");
    return document.getElementsByClassName(z)[0];
  }
  if (m[0] != ".") {
    return document.getElementById(x);
  }
}
const Ajax = (method, url, info) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(info));
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
          let res = JSON.parse(xhr.response);
          resolve(res);
        } else {
          reject("请求失败");
        }
      }
    };
  });
};
const Ajax2 = (method, url, headercontent) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader("Authorization", headercontent);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
          let res = JSON.parse(xhr.response);
          resolve(res);
        } else {
          reject("请求失败");
        }
      }
    };
  });
};
