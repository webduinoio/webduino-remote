//https://webbit.webduino.io/blockly/?demo=default#EqdrNJvwYzQy6
~async function () {
  // 凱比定位
  const content = document.querySelector('.content');
  content.classList.remove('loading');
  const kebbi = document.getElementById('svgKebbi');
  const circle = document.querySelector('.circle');
  const ww = content.offsetWidth;
  const wh = content.offsetHeight;
  const ox = (ww - kebbi.offsetWidth) / 2;
  const oy = (wh * 0.8 - kebbi.offsetHeight) / 2;
  kebbi.style.left = `${ox}px`;
  kebbi.style.top = `${oy}px`;
  circle.style.width = `${ww * 0.4}px`;
  circle.style.height = `${ww * 0.4}px`;
  circle.style.left = `${(ww - circle.offsetWidth) / 2}px`;
  circle.style.top = `${(wh * 0.8 - circle.offsetHeight) / 2}px`;

  // 預設值
  let list = {
    topic1: 'test1',
    topic2: 'test2',
    kebbiReset: 'reset',
    kebbiTop: 'up',
    kebbiBottom: 'down',
    kebbiLeft: 'left',
    kebbiRight: 'right',
    svgRed: 'r',
    svgGreen: 'g',
    svgYellow: 'y',
    svgBlue: 'b',
    btn0: '1',
    btn0n: '按鈕 1',
    btn1: '2',
    btn1n: '按鈕 2',
    btn2: '3',
    btn2n: '按鈕 3',
    btn3: '4',
    btn3n: '按鈕 4',
    btn4: '5',
    btn4n: '按鈕 5',
    btn5: '6',
    btn5n: '按鈕 6',
    btn6: '7',
    btn6n: '按鈕 7',
    btn7: '8',
    btn7n: '按鈕 8',
    btn8: '9',
    btn8n: '按鈕 9',
    btn9: '10',
    btn9n: '按鈕 10'
  };

  const urlOrigin = location.origin;
  const urlHash = location.hash.replace('#', '');
  const config = {
    databaseURL: "https://webbit-remote.firebaseio.com/"
  };
  firebase.initializeApp(config);
  const database = firebase.database();

  /* firebase 存檔 */
  const saveBtn = document.getElementById('saveBtn');
  const popup = document.getElementById('popup');
  const popupClose = document.getElementById('popupClose');
  const saveUrl = document.getElementById('saveUrl');
  popupClose.addEventListener('click', () => {
    popup.classList.remove('show');
  });
  saveBtn.addEventListener('click', async function () {
    let write = await database.ref('/').push(list);
    popup.classList.add('show');
    saveUrl.innerText = urlOrigin + '/#' + write.key;
    window.history.pushState({}, 0, urlOrigin + '#' + write.key);
    document.getSelection().removeAllRanges();
  });

  // 點擊後複製連結
  const copy = document.getElementById('copy');
  new ClipboardJS('#copy');
  copy.addEventListener('click', () => {
    copy.innerText = '複製成功';
    copy.classList.add('copied');
    setTimeout(() => {
      copy.innerText = '複製連結';
      copy.classList.remove('copied');
    }, 1000);
  });

  /* firebase 讀檔 */
  if (urlHash) {
    list = await database.ref(urlHash).once('value').then(result => {
      return result.val();
    });
    save(list);
  } else {
    // 讀取 localStorage 資料，沒有的話就套用預設值
    let read = JSON.parse(localStorage.getItem('kebbiMobileData'));
    if (read) {
      list = read;
    }
  }

  // 點擊選單按鈕開啟選單
  const setting = document.getElementById('setting');
  const menu = document.getElementById('menu');
  menu.addEventListener('click', () => {
    setting.classList.toggle('open');
    menu.classList.toggle('close');
    window.scrollTo(0, 0);
  });

  // 兩種控制器互相切換
  const s1 = document.getElementById('s1');
  const s2 = document.getElementById('s2');
  const main01 = document.getElementById('main01');
  const main02 = document.getElementById('main02');
  s1.addEventListener('click', () => {
    s1.classList.add('hide');
    main01.classList.add('hide');
    s2.classList.remove('hide');
    main02.classList.remove('hide');
  });
  s2.addEventListener('click', () => {
    s2.classList.add('hide');
    main02.classList.add('hide');
    s1.classList.remove('hide');
    main01.classList.remove('hide');
  });


  // 顯示十顆按鈕的文字
  const btn = document.querySelectorAll('.btn');
  let btnObj = {};
  btn.forEach(e => {
    btnObj[e.id] = document.getElementById(e.id);
    e.innerHTML = `<span>${list[e.id]}</span>`;
  });

  // 暫存到 localStorage 的函式
  function save(val) {
    localStorage.setItem('kebbiMobileData', JSON.stringify(val));
  }

  // input 欄位套用預設值
  const input = document.querySelectorAll('input');
  input.forEach(e => {
    let self = e;
    let m = self.getAttribute('m');
    self.value = list[m];
    self.addEventListener('input', () => {
      window.history.pushState({}, 0, urlOrigin);
      list[m] = self.value;
      if (btnObj[m]) {
        btnObj[m].innerHTML = `<span>${self.value}</span>`;
      }
      save(list);
      if (m == 'topic2') {
        mqttGet(list.topic2);
      }
    });
  });

  // 連接 mqtt server
  let webduinoBroadcastor;
  if (!webduinoBroadcastor) {
    webduinoBroadcastor = new webduino.module.mqttClient();
    await webduinoBroadcastor.connect();
  }
  // 發送 mqtt 訊號
  const mqtt = async function (topic, msg) {
    if (topic == list.topic1) {
      webduinoBroadcastor.send({
        topic: topic,
        message: (msg).toString()
      });
    }
  }
  // 接收 mqtt 訊號
  const message = document.getElementById('message');
  const messageH4 = document.querySelector('#message h4');
  let messageTimer;
  const mqttGet = async function (topic) {
    await webduinoBroadcastor.onMessage(topic, async (msg) => {
      if (topic == list.topic2) {
        clearTimeout(messageTimer);
        messageH4.innerText = msg;
        message.classList.add('show');
        messageTimer = setTimeout(() => {
          message.classList.remove('show');
        }, 3000);
      }
    });
  }
  mqttGet(list.topic2);

  // 下方怪獸按鈕點擊事件
  const monsterBtn = document.querySelectorAll('.monster-btn');
  monsterBtn.forEach(e => {
    let self = e;
    self.addEventListener('click', () => {
      mqtt(list.topic1, list[self.id]);
    });
  });

  // 十顆按鈕點擊事件
  btn.forEach(e => {
    let self = e;
    let msg = self.getAttribute('msg');
    self.addEventListener('click', () => {
      mqtt(list.topic1, list[msg]);
    });
  });



  let send = {
    center: false,
    top: false,
    bottom: false,
    left: false,
    right: false
  };
  function sendCheck(type) {
    send = {
      center: false,
      top: false,
      bottom: false,
      left: false,
      right: false
    };
    if (type) {
      send[type] = true;
    }
  }

  // Kebbi 拖曳事件
  drag();
  function drag() {
    let drag = false;
    let mx, my, dx, dy;
    const move = function (evt) {
      let touches = evt.changedTouches;
      if (touches) {
        mx = ~~touches[0].pageX;
        my = ~~touches[0].pageY;
      } else {
        mx = event.pageX;
        my = event.pageY;
      }
      if (drag) {
        kebbi.style.left = mx - dx + 'px';
        kebbi.style.top = my - dy + 'px';
      }
      if (kebbi.classList.contains('target')) {
        let kx = kebbi.offsetLeft;
        let ky = kebbi.offsetTop;
        if (kx < ww * 0.2) {
          if (!send.left) {
            sendCheck('left');
            mqtt(list.topic1, list.kebbiLeft);
          }
        } else if (kx > ww * 0.5) {
          if (!send.right) {
            sendCheck('right');
            mqtt(list.topic1, list.kebbiRight);
          }
        } else {
          if (ky < wh * 0.2) {
            if (!send.top) {
              sendCheck('top');
              mqtt(list.topic1, list.kebbiTop);
            }
          } else if (ky > wh * 0.4) {
            if (!send.bottom) {
              sendCheck('bottom');
              mqtt(list.topic1, list.kebbiBottom);
            }
          } else {
            if (!send.center) {
              sendCheck('center');
              mqtt(list.topic1, list.kebbiReset);
            }
          }
        }
      }
    };
    const target = function (evt) {
      kebbi.classList.remove('reset');
      let touches = evt.changedTouches;
      if (touches) {
        mx = ~~touches[0].pageX;
        my = ~~touches[0].pageY;
      }
      drag = true;
      dx = mx - kebbi.offsetLeft;
      dy = my - kebbi.offsetTop;
      kebbi.classList.add('target');
    };
    document.addEventListener('mousemove', move);
    kebbi.addEventListener('touchmove', move);

    function reset() {
      if (send.top || send.bottom || send.left || send.right) {
        console.log('reset');
        mqtt(list.topic1, list.kebbiReset);
      }
      sendCheck();
      drag = false;
      kebbi.classList.remove('target');
      kebbi.classList.add('reset');
      kebbi.style.left = `${ox}px`;
      kebbi.style.top = `${oy}px`;
    }

    document.addEventListener('mouseup', reset);
    kebbi.addEventListener('touchend', reset);

    kebbi.addEventListener('mousedown', target);
    kebbi.addEventListener('touchstart', target);
  }

}();
