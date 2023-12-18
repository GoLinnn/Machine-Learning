let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');

// 训练集
const x_train = [20, 30, 50]
const y_train = [30, 40, 100]

// 总数
const m = x_train.length

// 根据数据绘制点
const drawPoint = function () {
    for (let i = 0; i < m; i++) {
        ctx.beginPath();
        ctx.arc(x_train[i], 500 - y_train[i], 3, 0, 2 * Math.PI);
        ctx.fill();
    }
}
drawPoint()

// 参数
let w = 0
let b = 0

// 学习率 learning_rate
const learning_rate = 0.0015

// 预测f
const f = function (x) {
    return w * x + b
}

// 成本函数cost_f
const cost_f = function () {
    let cost = 0
    // 计算误差平方和 即(y(预测) - y)^2的和 
    for (let i = 0; i < m; i++) {
        cost += Math.pow(f(x_train[i]) - y_train[i], 2)
    }
    // 计算平均误差平方和
    return cost / (2 * m)
}

// 梯度递减算法 gradient_descent
const gradient_descent = function () {
    let w_new = 0;
    let b_new = 0;
    // 1. 计算w新值
    // 1.1 cost_f对w求导
    // 计算(y(预测) - y) * x 的和，这个和再除m就是cost_f对w求导
    for (let i = 0; i < m; i++) {
        w_new += (f(x_train[i]) - y_train[i]) * x_train[i]
    }
    // 1.2 w_new = w - learning_rate*(cost_f对w求导)
    w_new = w - learning_rate * (w_new / m)

    // 2. 计算b新值
    // 2.1 计算(y(预测) - y) 的和，这个和再除m就是cost_f对b求导
    for (let i = 0; i < m; i++) {
        b_new += f(x_train[i]) - y_train[i]
    }
    // 2.2 b_new = b - learning_rate*(cost_f对b求导)
    b_new = b - learning_rate * (b_new / m)

    // 3. 更新w,b
    w = w_new
    b = b_new
}
// 迭代次数
const times = 2000
for (let i = 0; i < times; i++) {
    gradient_descent()
    const currentCost = cost_f()
    console.log(`第${i + 1}次迭代, 当前成本函数计算结果为：${currentCost}, w值为${w}, b值为${b}`)
}

// 绘制回归线条
const drawLine = function () {
    ctx.beginPath();
    ctx.moveTo(0, 500 - b);
    ctx.lineTo(500, 500 - (500 * w + b));
    ctx.stroke();
}
drawLine()


