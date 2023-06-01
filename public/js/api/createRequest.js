/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  let url = options.url;
  let formData = new FormData();
  let sendData = null;
  if(options.method === 'DELETE') {
    url+='?' + options.data.id;
  }
  if (options.method === 'GET') {
    if (options.url === '/account/' ){
      url = options.url;
      url += options.data.id;
    } else if (options.url === '/transaction' ){
      url = options.url;
      url += "?account_id=" + options.data.id;
    } else {
      url+='?'
      for (let key in options.data) {
        url +='&'+ key + '=' + options.data[key];
      }
    }
  } else {
    for (let key in options.data) {
      formData.append(key,options.data[key]);
    }
    sendData = formData;
  }
    try {
    xhr.open(options.method,url);
    xhr.send(sendData);
  } catch (e) {
    console.log(e);
  }
  xhr.onload = function() {
    console.log(xhr.response)
    if (options.callback){
      options.callback(xhr.response.error, xhr.response);
    }



  }
};