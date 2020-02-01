const canvas = document.getElementById('tela');
const ctx = canvas.getContext('2d');

var dt = 0;
var t0 = 0;  
var x = 100;

/*Vector cotains rgb colors*/
var colors = [
    "rgba(255, 0, 0, 0.5)",
    "rgba(0, 255, 0, 0.5)",
    "rgba(0, 0, 255, 0.5)",
    "rgba(0, 255, 255, 0.5)",
    "rgba(255, 255, 0, 0.5)"
];


/*Random number in range*/
function randomNumber(min,max){
    return Math.floor(Math.random() * (max-min) + min );
}

/* Create N aps with random attributes */
function createAps(quant){
    var aps = [];
    for(var i=0;i<quant;i++){
        var ap = {
            x: randomNumber(0,500),
            y: randomNumber(0,500),
            raio: randomNumber(20,50),
            color: randomNumber(0,colors.length)
        };
        aps.push(ap);
    }
    
    return aps;
}

/* Draw all aps in vector */
function drawAps(aps){
    aps.forEach(function(ap){
        
        //Draw circle
        ctx.beginPath();
        ctx.arc(ap.x, ap.y, ap.raio, 0, 2 * Math.PI);
        ctx.closePath();

        ctx.fillStyle = colors[ap.color];
        ctx.fill();
        
        // Draw places with click work
        ctx.fillStyle = 'rgba(225,225,225,0)';
        ctx.fillRect(ap.x+ap.xPlus, ap.y+ap.yPlus , 20, 20);
        ctx.fillRect(ap.x+ap.xMinus, ap.y+ap.yMinus , 20, 20);

        // Draw Plus and Minus 
        ctx.fillStyle = "black";
        ctx.fillRect(ap.x+ap.xPlus, ap.y+ap.yPlus+5 , 20, 10);
        ctx.fillRect(ap.x+ap.xPlus+5, ap.y+ap.yPlus , 10, 20);
        ctx.fillRect(ap.x+ap.xMinus, ap.y+ap.yMinus+5 , 20, 10);

        // Draw number
        ctx.font = "25px Arial";
        ctx.fillText(ap.color+1, ap.x+ap.xText, ap.y+ap.yText); 
        
        
    });
}

function insideCircle(Xp,Yp,Xc,Yc,raio){
    var d = Math.sqrt( Math.pow(Xp - Xc,2) + Math.pow(Yp - Yc,2) );
    if(d>raio)
        return false;
    else 
        return true;
}

function insideRect(x,y,clientX,clientY){
    if(clientX > x+20 || clientX < x)
        return false;
    if(clientY > y+20 || clientY < y)
        return false;
    return true;
}

/*Main Code*/ 
requestAnimationFrame(passo);
var ap = {
    x: 200,
    y: 200,
    raio: 50,
    color: randomNumber(0,colors.length),
    xPlus: -10,
    yPlus: -30,
    xMinus: -10,
    yMinus: 15,
    xText: -8,
    yText: 14
};

var ap2 = {
    x: 150,
    y: 200,
    raio: 50,
    color: randomNumber(0,colors.length),
    xPlus: -10,
    yPlus: -30,
    xMinus: -10,
    yMinus: 15,
    xText: -8,
    yText: 14
};

var aps = [ap,ap2];
function passo(t){
    dt = (t - t0)/1000;
    ctx.clearRect(0,0,canvas.width,canvas.height);

    drawAps(aps);
    
    t0 = t;
    requestAnimationFrame(passo);
}


canvas.addEventListener("mousedown",function(e){
    
        aps.forEach(function(ap){
            if( insideRect(ap.x+ap.xPlus,ap.y+ap.yPlus,e.clientX,e.clientY) ){
            
                if(ap.color == colors.length-1){
                    ap.color = 0;
                }
                else ap.color++;
            }
            else if( insideRect(ap.x+ap.xMinus,ap.y+ap.yMinus,e.clientX,e.clientY) ){
            
                if(ap.color == 0){
                    ap.color = colors.length-1;
                }
                else ap.color--;
            }
        });
       
    }
)