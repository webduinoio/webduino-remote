# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [v1.0.2] - 2022.11.29

### Fixed

- 萬用遙控器小車拖拉過後，翻轉畫面小車位置偏移

## [v1.0.1] - 2022.11.15

### Fixed

- 使用手機開啟萬用遙控器輸入文字會刷新畫面，導致無法正常完成操作

## [v1.0.0] - 2022.11.1

### Fixed

- 平板開啟萬用遙控器時，訊息傳送輸入框消失
- 平板或手機旋轉後，刷新萬用遙控器

### Added

- 實作萬用遙控器 i18n

### Changed

- meta 修改 

## 2022.2.25

### Fixed

- 調整小車拖拉時的觸發事件範圍，調整為小車的 1/3 寬/高。
- mqtt 斷線時，自動重連

### Changed

- 拿掉 webduinojs 的部份
- 獨立的 mqttClient.js

[unreleased]: https://github.com/webduinoio/webduino-remote/compare/v1.0.2...HEAD
[v1.0.2]: https://github.com/webduinoio/webduino-remote/releases/tag/v1.0.2
[v1.0.1]: https://github.com/webduinoio/webduino-remote/releases/tag/v1.0.1
[v1.0.0]: https://github.com/webduinoio/webduino-remote/releases/tag/v1.0.0