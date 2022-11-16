~async function () {

  function handleCustomButton() {
    const sendButton = document.querySelector('.input-group-button');
    const customMessage = document.getElementById('customMessage');
    sendButton.addEventListener('click', () => {
      mqttPush(list.topic1, customMessage.value);
      sendButton.classList.add('click');
      setTimeout(() => {
        sendButton.classList.remove('click');
      }, 100);
    });
  }

  // 載入 js 之後顯示所有元件
  const content = document.querySelector('.content');
  content.classList.remove('loading');

  // 凱比機器人和中間的圓形 logo 定位
  const kebbi = document.getElementById('svgKebbi');
  const circle = document.querySelector('.circle');
  function imgPosition() {
    const ww = content.offsetWidth;
    const wh = content.offsetHeight;
    kebbi.style.left = `${(ww - kebbi.offsetWidth) / 2}px`;
    kebbi.style.top = `${(wh * 0.8 - kebbi.offsetHeight) / 2}px`;
    circle.style.width = `${ww * 0.4}px`;
    circle.style.height = `${ww * 0.4}px`;
    circle.style.left = `${(ww - circle.offsetWidth) / 2}px`;
    circle.style.top = `${(wh * 0.8 - circle.offsetHeight) / 2}px`;
  }

  imgPosition();

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
    btn0n: 'Button 1',
    btn1: '2',
    btn1n: 'Button 2',
    btn2: '3',
    btn2n: 'Button 3',
    btn3: '4',
    btn3n: 'Button 4',
    btn4: '5',
    btn4n: 'Button 5',
    btn5: '6',
    btn5n: 'Button 6',
    btn6: '7',
    btn6n: 'Button 7',
    btn7: '8',
    btn7n: 'Button 8',
    btn8: '9',
    btn8n: 'Button 9',
    btn9: '10',
    btn9n: 'Button 10'
  };

  const urlOrigin = location.origin;
  const urlPath = location.pathname;
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
    let t = new Date();
    list.time = `${t.getFullYear()}/${t.getMonth() * 1 + 1}/${t.getDate()} ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`;
    let write = await database.ref('/').push(list);
    popup.classList.add('show');
    let url = `${urlOrigin}${urlPath}#${write.key}`;
    saveUrl.innerText = url;
    window.history.pushState({}, 0, url);
    document.getSelection().removeAllRanges();
  });

  // 點擊後複製連結
  const copy = document.getElementById('copy');
  new ClipboardJS('#copy');
  copy.addEventListener('click', () => {
    copy.innerText = 'Copy Successfully!';
    copy.classList.add('copied');
    setTimeout(() => {
      copy.innerText = 'Copy link';
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
    let read = JSON.parse(localStorage.getItem('kebbiMobileEnData'));
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
    localStorage.setItem('kebbiMobileEnData', JSON.stringify(val));
  }

  // input 欄位套用預設值
  const input = document.querySelectorAll('input');
  input.forEach(e => {
    let self = e;
    let m = self.getAttribute('m');
    self.value = list[m];
    self.addEventListener('input', () => {
      window.history.pushState({}, 0, `${urlOrigin}${urlPath}`);
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
    webduinoBroadcastor = new window.mqttClient();
    try {
      await webduinoBroadcastor.connect();
    } catch (err) {
      console.error(err);
    }
  }
  // 發送 mqtt 訊號
  const mqttPush = function (topic, msg) {
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
      mqttPush(list.topic1, list[self.id]);
      self.classList.add('click');
      setTimeout(() => {
        self.classList.remove('click');
      }, 100);
    });
  });

  // 十顆按鈕點擊事件
  btn.forEach(e => {
    let self = e;
    let msg = self.getAttribute('msg');
    self.addEventListener('click', () => {
      mqttPush(list.topic1, list[msg]);
      self.classList.add('click');
      setTimeout(() => {
        self.classList.remove('click');
      }, 100);
    });
  });

  handleCustomButton();

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
    let mx, my, dx, dy, carSize;

    function move(evt) {
      let touches = evt.changedTouches;
      if (touches) {
        mx = ~~touches[0].pageX;
        my = ~~touches[0].pageY;
      } else {
        mx = evt.pageX;
        my = evt.pageY;
      }
      if (drag) {
        kebbi.style.left = mx - dx + 'px';
        kebbi.style.top = my - dy + 'px';
      }
      if (kebbi.classList.contains('target')) {
        const kx = kebbi.offsetLeft; // 車子 left
        const ky = kebbi.offsetTop;  // 車子 top
        const carSize = getCarSize();

        // 注意，小車一開始的中心點 y 座標，不等於畫面的中心點 y 座標。
        // 邊界在中心的周圍 1/3 小車寬/高的距離
        const kxCenter = kx + carSize.width / 2;  // 車子中心點 x 座標
        const kyCenter = ky + carSize.height / 2; // 車子中心點 y 座標
        const leftSide = content.offsetWidth * 0.5 - carSize.width / 3;  // 左邊界，小於這個值，判定車子移動到左邊
        const rightSide = content.offsetWidth * 0.5 + carSize.width / 3; // 右邊界，大於這個值，判定車子移動到右邊
        const topSide = (content.offsetHeight * 0.8 - kebbi.offsetHeight) / 2 + carSize.height / 6;        // 上邊界，小於這個值，判定車子移動到上面
        const bottomSide = (content.offsetHeight * 0.8 - kebbi.offsetHeight) / 2 + 5 * carSize.height / 6; // 下邊界，小於這個值，判定車子移動到下面

        if (kxCenter < leftSide) {
          if (!send.left) {
            sendCheck('left');
            mqttPush(list.topic1, list.kebbiLeft);
          }
        } else if (kxCenter > rightSide) {
          if (!send.right) {
            sendCheck('right');
            mqttPush(list.topic1, list.kebbiRight);
          }
        } else {
          if (kyCenter < topSide) {
            if (!send.top) {
              sendCheck('top');
              mqttPush(list.topic1, list.kebbiTop);
            }
          } else if (kyCenter > bottomSide) {
            if (!send.bottom) {
              sendCheck('bottom');
              mqttPush(list.topic1, list.kebbiBottom);
            }
          } else {
            if (!send.center) {
              sendCheck('center');
              mqttPush(list.topic1, list.kebbiReset);
            }
          }
        }
      }
    }

    function target(evt) {
      evt.preventDefault();
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
      updateCarSize();
      sendCheck('center'); // 設定初始狀態為 center
    }

    function reset() {
      if (send.top || send.bottom || send.left || send.right) {
        console.log('reset');
        mqttPush(list.topic1, list.kebbiReset);
      }
      sendCheck();
      drag = false;
      kebbi.classList.remove('target');
      kebbi.classList.add('reset');
      kebbi.style.left = `${(content.offsetWidth - kebbi.offsetWidth) / 2}px`;
      kebbi.style.top = `${(content.offsetHeight * 0.8 - kebbi.offsetHeight) / 2}px`;
    }

    function updateCarSize() {
      const car = document.getElementById('svgKebbi');
      carSize = {
        width: car.offsetWidth,
        height: car.offsetHeight,
      };
    }

    function getCarSize() {
      return carSize;
    }

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', reset);
    kebbi.addEventListener('mousedown', target);

    kebbi.addEventListener('touchmove', move);
    kebbi.addEventListener('touchend', reset);
    kebbi.addEventListener('touchstart', target);
  }

  // 處理中間圖片跟隨視窗大小移動位置
  window.addEventListener('resize', imgPosition);

}();
