
//Dynamic colorful ball
class Ball {
    /**
     * 球基类构造函数
     * @param {number} x -球圆心x坐标
     * @param {number} y -球圆心y坐标
     * @param {number} r -小球半径
     * @param {object} color -小球颜色
     * @param {object} ctx -canvas画布的绘画环境
     * */
    constructor(x,y,r,color,ctx){
        this.x=x;
        this.y=y;
        this.r=r;
        this.color=color;
        this.ctx=ctx;
    }
    /**
     * 渲染出小球
     * */
    render(){
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(this.x,this.y,this.r,0,2*Math.PI,false);
        this.ctx.fillStyle=this.color;
        this.ctx.fill();
        this.ctx.restore();
    }
}
class DynamicBall extends Ball{
    /**
     * 动态球类构造函数
     * @param {number} x -球圆心x坐标
     * @param {number} y -球圆心y坐标
     * @param {number} r -小球半径
     * @param {object} color -小球颜色
     * @param {object} ctx -canvas画布的绘画环境
     * */
    constructor(x,y,r,color,ctx){
        super(x,y,r,color,ctx);
        this.dx=DynamicBall.getRandomNum(-5,5);
        this.dy=DynamicBall.getRandomNum(-5,5);
        this.dr=DynamicBall.getRandomNum(1,3);
    }
    /**
     * 更新球坐标及半径
     * */
    update(){
        this.x+=this.dx;
        this.y+=this.dy;
        this.r-=this.dr;
        if(this.r<0)this.r=0;
    }
    static getRandomNum(min,max){
        let range=max-min;
        let rnd=Math.random();
        return parseInt(min+Math.round(rnd*range));
    }
}


//draw clock

class Clock{
    /**
     * 时钟类构造函数
     * @param {object} canvas -canvas画布
     * @param {number} r -时钟半径
     * @param {number} rate -基准比例
     * */
    constructor(canvas,r,rate){
        this.ctx=canvas.getContext("2d");
        this.r=r;
        this.rem=rate;
    }
    /**
     * 基本轮廓
     * */
    drawOutline(){
        //画外圆轮廓
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.translate(this.r,this.r);
        this.ctx.lineWidth=10*this.rem;
        this.ctx.arc(0,0,this.r-this.ctx.lineWidth/2,0,2*Math.PI,false);
        this.ctx.stroke();
        //画数字
        let numArr=[3,4,5,6,7,8,9,10,11,12,1,2];
        this.ctx.font=18*this.rem+"px Arial";
        this.ctx.textAlign="center";
        this.ctx.textBaseline="middle";
        numArr.forEach((num,i)=>{
            let rad=2*Math.PI/12*i;
            let x=Math.cos(rad)*(this.r-35*this.rem);
            let y=Math.sin(rad)*(this.r-35*this.rem);
            this.ctx.fillText(num.toString(),x,y);
        });

        //画时钟上的60个点
        for(let i=0;i<60;i++){
            let rad=2*Math.PI/60*i;
            let x=Math.cos(rad)*(this.r-20*this.rem);
            let y=Math.sin(rad)*(this.r-20*this.rem);
            this.ctx.beginPath();
            if(i%5==0){
                this.ctx.fillStyle="#000";
                this.ctx.arc(x,y,3*this.rem,0,2*Math.PI,false);
            }else{
                this.ctx.fillStyle="#ccc";
                this.ctx.arc(x,y,2*this.rem,0,2*Math.PI,false);
            }
            this.ctx.fill();
        }
    }
    /**
     * 画时针
     * @param {number} h -小时
     * @param {number} m -分钟
     * */
    drawHour(h,m){
      let rad=2*Math.PI/12*h;
      let mrad=2*Math.PI/12/60*m;
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.rotate(rad+mrad);
      this.ctx.lineWidth=5*this.rem;
      this.ctx.lineCap="round";
      this.ctx.moveTo(0,4*this.rem);
      this.ctx.lineTo(0,-this.r+50*this.rem);
      this.ctx.stroke();
      this.ctx.restore();
    }
    /**
     * 画分针
     * @param {number} m -分钟
     * @param {number} s -秒
     * */
    drawMinute(m,s){
        let rad=2*Math.PI/60*m;
        let mrad=2*Math.PI/60/60*s;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.rotate(rad+mrad);
        this.ctx.lineWidth=4*this.rem;
        this.ctx.lineCap="round";
        this.ctx.strokeStyle="blue";
        this.ctx.moveTo(0,8*this.rem);
        this.ctx.lineTo(0,-this.r+30*this.rem);
        this.ctx.stroke();
        this.ctx.restore();
    }
    /**
     * 画秒针
     * @param {number} s -秒
     * */
    drawSecond(s){
        let rad=2*Math.PI/60*s;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.rotate(rad);
        this.ctx.fillStyle="red";
        this.ctx.moveTo(-1.5*this.rem,12*this.rem);
        this.ctx.lineTo(1.5*this.rem,12*this.rem);
        this.ctx.lineTo(this.rem,-this.r+20*this.rem);
        this.ctx.lineTo(-this.rem,-this.r+20*this.rem);
        this.ctx.fill();
        this.ctx.restore();
    }
    /**
     * 针的固定点
     * */
    drawDot(){
        this.ctx.beginPath();
        this.ctx.fillStyle="green";
        this.ctx.arc(0,0,4*this.rem,0,2*Math.PI,false);
        this.ctx.fill();
    }
    /**
     * 初始化时钟
     * */
    init(){
        let date=new Date();
        let h=date.getHours();
        let m=date.getMinutes();
        let s=date.getSeconds();
        this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
        this.drawOutline();
        this.drawHour(h,m);
        this.drawMinute(m,s);
        this.drawSecond(s);
        this.drawDot();
        this.ctx.restore();
    }
}
