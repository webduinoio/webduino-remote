~(async function () {
  // 處理畫面中央的圖示變換
  const handleImageType = () => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");

    document.body.classList.remove("kebbi", "aicar");
    if (type === "kebbi") {
      document.body.classList.add("kebbi");
    } else {
      document.body.classList.add("aicar");
    }
  };

  handleImageType();
})();
