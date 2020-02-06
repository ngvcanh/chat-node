// ============ Start your config
var COS_PathSocket = 'http://localhost:1000';
var COS_ChatBoxWrapperID = 'rootChat';
var COS_heightBoxChat = '500px';
var COS_widthBoxChat = '100%';
// ============ End your config

var COS_process = {
  SCREEN_WELCOME : 0,
  SCREEN_LOGIN : 1,
  SCREEN_REGISTER : 2,
  SCREEN_CHAT : 3
};

var COS_processBox = COS_process.SCREEN_WELCOME;

var COS_IO = null;

var COS_boxchat = null;

var COS_users = [];

var COS_online = [];

var COS_message = [];

function COS_appendSocket(p, l){
  var path = p + '/socket.io/socket.io.js'
  , s = document.createElement('script');
  s.src = path;
  s.onload = l;
  document.getElementsByTagName('body')[0].appendChild(s);
}

function COS_render(bc){
  COS_boxchat.innerText = '';
console.log('COS_processBox', COS_processBox);
  switch(COS_processBox){

    case COS_process.SCREEN_CHAT:
      COS_create_screen_chat(bc);
      break;

    case COS_process.SCREEN_REGISTER:
      COS_create_screen_register(bc);
      break;
    
    default:
      COS_create_screen_welcome(bc);
  }
}

function COS_render_user_list(){

}

function COS_render_message(){}

function COS_click_register(event){
  event.preventDefault();
  COS_processBox = COS_process.SCREEN_REGISTER;
  COS_render(COS_boxchat);
}

function COS_click_login(event){
  event.preventDefault();
  COS_processBox = COS_process.SCREEN_LOGIN;
  COS_render(COS_boxchat);
}

function COS_create_screen_chat(bc){
  var userList = document.createElement('ul');
  userList.id = 'COS_user_list';
  Object.assign(userList.style, {
    margin : 0,
    padding : 0,
    float : 'left',
    width : '30%'
  });

  var msgList = document.createElement('div');
  msgList.id = 'COS_message_list';
  Object.assign(msgList.style, {
    float : 'right',
    width : '70%'
  });

  var clear = document.createElement('div');
  Object.assign(clear.style, {
    clear : 'both',
    display : 'block'
  });

  bc.appendChild(userList);
  bc.appendChild(msgList);
  bc.appendChild(clear);

  COS_IO.emit('user require data');
}

function COS_create_screen_register(bc){
  var h2 = document.createElement('h2');
  h2.innerText = 'Register';
  Object.assign(h2.style, { textAlign : 'center' });
  bc.appendChild(h2);

  COS_create_form(bc, function(event){
    event.preventDefault();
    COS_IO.emit('user register', {
      username : event.target.username.value,
      password : event.target.password.value
    });
  });
}

function COS_create_form(bc, sm){
  var form = document.createElement('form');
  form.onsubmit = sm;
  Object.assign(form.style, {
    width : '350px',
    maxWidth : '90%',
    margin : '0 auto'
  });
  
  var divUsername = document.createElement('div');
  Object.assign(divUsername.style, {
    margin : '8px 0'
  });
  
  var labelUsername = document.createElement('label');
  labelUsername.innerText = 'Username';
  Object.assign(labelUsername.style, {
    marginBottom : '5px',
    display : 'block'
  })

  var inputUsername = document.createElement('input');
  inputUsername.type = 'text';
  inputUsername.name = 'username';
  Object.assign(inputUsername.style, {
    width : '100%',
    outline : 0,
    height : '38px',
    lineHeight : '38px',
    padding : '0 8px',
    borderRadius : '8px',
    border : '1px solid green'
  });

  divUsername.appendChild(labelUsername);
  divUsername.appendChild(inputUsername);

  var divPassword = document.createElement('div');
  Object.assign(divPassword.style, {
    margin : '8px 0'
  });
  
  var labelPassword = document.createElement('label');
  labelPassword.innerText = 'Password';
  Object.assign(labelPassword.style, {
    marginBottom : '5px',
    display : 'block'
  })

  var inputPassword = document.createElement('input');
  inputPassword.type = 'password';
  inputPassword.name = 'password';
  Object.assign(inputPassword.style, {
    width : '100%',
    outline : 0,
    height : '38px',
    lineHeight : '38px',
    padding : '0 8px',
    borderRadius : '8px',
    border : '1px solid green'
  });

  divPassword.appendChild(labelPassword);
  divPassword.appendChild(inputPassword);

  var divButton = document.createElement('div');
  Object.assign(divButton.style, {
    margin : '8px 0',
    textAlign : 'center'
  });

  var btn = document.createElement('button');
  btn.innerText = 'Submit';
  btn.type = 'submit';
  Object.assign(btn.style, {
    background : 'green',
    color : '#fff',
    height : '38px',
    lineHeight : '38px',
    border : 'none',
    borderRadius : '8px',
    cursor : 'pointer',
    fontWeight : 'bold',
    padding : '0 20px'
  });

  divButton.appendChild(btn);

  form.appendChild(divUsername);
  form.appendChild(divPassword);
  form.appendChild(divButton);

  bc.appendChild(form);
}

function COS_create_screen_welcome(bc){
  var h2 = document.createElement('h2');
  Object.assign(h2.style, {
    fontSize : '20px',
    textAlign : 'center',
    color : '#333',
    fontWeight : 'bold',
    lineHeight : 1
  });
  h2.innerText = 'Welcome COS';
  bc.appendChild(h2);
  
  var pa = document.createElement('p');
  Object.assign(pa.style, {
    textAlign: 'center'
  });
  pa.appendChild(document.createTextNode('Please '));

  var aReg = document.createElement('a');
  Object.assign(aReg.style, {
    color : 'green',
    cursor : 'pointer'
  });

  aReg.innerText = 'Register';
  aReg.onclick = COS_click_register;
  pa.appendChild(aReg);

  pa.appendChild(document.createTextNode(' or '));

  var aLog = document.createElement('a');
  Object.assign(aLog.style, {
    color : 'green',
    cursor : 'pointer'
  });

  aLog.innerText = 'Login';
  aLog.onclick = COS_click_login;
  pa.appendChild(aLog);

  pa.appendChild(document.createTextNode(' to chat '));

  bc.appendChild(pa)
}

(function(p, c, h, w){

  var userKey = 'COS_username';
  COS_boxchat = document.getElementById(c);
  
  if (!COS_boxchat){
    COS_boxchat = document.createElement('div');
    COS_boxchat.id = c;
    document.getElementsByTagName('body')[0].appendChild(COS_boxchat);
  }

  COS_boxchat.style.height = h;
  COS_boxchat.style.width = w;

  COS_render(COS_boxchat, COS_processBox);
  
  COS_appendSocket(p, function(){
    var loginUserName = localStorage.getItem(userKey)
    , paramSocket = {
      transports : ['websocket', 'polling'], 
      query : 'username=' + loginUserName
    };
    
    COS_IO = io.connect(p, paramSocket);

    COS_IO.on('user validate login', function(logged){
      if (logged){
        COS_processBox = COS_process.SCREEN_CHAT;
        COS_render(COS_boxchat);
      }
    });

    COS_IO.on('user register', function(data){console.log(data);
      if (data.error){
        alert(data.error);
      }
      else{
        localStorage.setItem(userKey, data.username);
        COS_processBox = COS_process.SCREEN_CHAT;
        COS_render(COS_boxchat);
      }
    });

    COS_IO.on('user require data', function(data){
      COS_users = data.users;
      COS_online = data.online;
      COS_message = data.message;
      COS_render_user_list();
      COS_render_message();
    });
  });

  

})(
  COS_PathSocket, 
  COS_ChatBoxWrapperID, 
  COS_heightBoxChat,
  COS_widthBoxChat
);