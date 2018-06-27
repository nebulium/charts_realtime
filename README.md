# charts_realtime
- A demo shows the real-time changes of data in different types of charts.
- demo地址： <https://nebulium.github.io/charts_realtime/>

### 暂时设定
- 纵坐标为吞吐量，横坐标先认为是均匀的时间(1h)
- 两条曲线：一条为实际曲线，一条为预测曲线。
- 姑且认为：实际曲线上的6个点，算出预测曲线上的1个点
    - 如果展示出起点，那么预测曲线的比实际曲线的起点晚6个点。
    - 预测曲线终点比实际曲线终点快1个点

### 具体实现
- [x] 基于charts.js
- [x] 简单test demo：4个版本 -（折线 or 曲线） x （随着时间推移x轴长度减小 or 整个图平移）
- [x] 基于mock.js模拟数据结构
- [x] 处理时间轴的问题
- [x] 处理初始化或者更新图表的问题
- [x] 考虑显示数据较多的时候，曲线、点以及tooltips的样式问题
- [x] 设计页面和版式，从输入的日期开始获取数据
- [x] 处理ajax
- [x] 调试接口mock.js，设计数据使之较为美观，从指定日期开始获取数据
- [ ] 暂停or继续？
- [ ] 其他
