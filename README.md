# 今晚吃什么盲盒

一个中文本地随机美食盲盒 MVP。它把“今天吃什么”的选择交给转盘，用户选择盲盒主题后点击“开盲盒”，应用会随机给出一个美食建议，并提供高德地图搜索入口。

## 在线使用

项目可以部署到 Vercel、Netlify、GitHub Pages 或任意静态网站服务。部署后，别人打开网址即可使用。

当前版本使用本地数据，不需要数据库，也不需要高德 API Key。

## 功能

- 中文美食盲盒主题：晚餐救场、治愈一点、清爽减负、快乐小吃
- Canvas 转盘随机抽取
- 中文结果卡片：预算、标签、推荐理由和小提示
- 高德地图 URI 搜索跳转
- 移动端和桌面端自适应
- 支持 React Web 构建，也保留 Capacitor Android 项目结构

## 技术栈

- React
- Create React App / react-scripts
- HTML5 Canvas
- Capacitor Android

## 本地开发

```bash
npm install
npm start
```

默认开发地址：

```text
http://localhost:3000
```

## 构建

```bash
npm run build
```

构建产物会生成在 `build/` 目录。

## 测试

```bash
npm test -- --watchAll=false
```

## 项目结构

```text
src/
  data/
    blindBoxes.js              # 本地盲盒数据
  components/
    Roulette.js                # Canvas 转盘
    Roulette.css
    BlindBoxResult.js          # 开盒结果卡片
    BlindBoxResult.css
  App.js                       # 主页面逻辑
  App.css                      # 页面样式
```

## 高德地图说明

当前版本的“高德搜索”按钮使用高德 URI 链接，只是打开地图搜索页，不调用高德 Web 服务 API，因此不需要申请 API Key。

如果后续要做“附近真实商家盲盒”，可以改为：

```text
浏览器定位 -> 后端接口 -> 高德 Web 服务周边搜索 -> 返回附近餐饮商家 -> 随机抽取
```

正式接入高德 API 时，建议把 Key 和安全密钥放在后端环境变量中，不要写进前端代码。

## 来源与改编说明

本项目改编自 [wing1008/food-roulette-app](https://github.com/wing1008/food-roulette-app)。

原项目 README 标注为 MIT License。本项目在其基础上做了以下改动：

- 改为中文本地随机美食盲盒 MVP
- 移除 Kakao 地图定位和附近餐厅 API 逻辑
- 移除韩国地图/外卖平台跳转
- 新增中文盲盒数据、结果卡片和高德地图搜索跳转
- 修复原界面中的乱码文案和应用元信息
- 补充开源许可文件和改编说明

## 开源许可

本项目以 MIT License 开源，详见 [LICENSE](LICENSE)。

改编来源说明见 [NOTICE.md](NOTICE.md)。

## 后续计划

- 自定义盲盒池
- 保存最近开盒历史
- 按预算、口味、辣度筛选
- 接入高德 Web 服务 API，支持附近真实商家随机抽取
