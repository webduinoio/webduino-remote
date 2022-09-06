# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).



## 2022.9.5

### Changed

- 調整 mqttClient.min.js

## 2022.2.25

### Fixed

- 調整小車拖拉時的觸發事件範圍，調整為小車的 1/3 寬/高。
- mqtt 斷線時，自動重連

### Changed

- 拿掉 webduinojs 的部份
- 獨立的 mqttClient.js