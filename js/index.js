window.onload = () => {
//cuando carga window ejecuta este codigo    
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    const LIMITE_IZQ = 65;
    const LIMITE_DER = 385;
  
    class Coche{
      constructor(){ 
        
          this.x = 225;
          this.y = 600;
          this.w = 50;
          this.h =90;
          this.velocidadx = 10;
          this.imgCoche = new Image();
          this.imgCoche.src = "images/car.png";
          this.imgCoche.addEventListener("load", () => {
            //   this.loaded = true;
              ctx.drawImage(this.imgCoche, this.x, this.y, this.w, this.h);
          });
        }
      print(ctx){
          ctx.drawImage(this.imgCoche, this.x, this.y, this.w, this.h);
      }
      moveIzq(){
          this.x -= this.velocidadx;
          if(this.x < LIMITE_IZQ) this.x = LIMITE_IZQ;
          }
      moveDer(){
          this.x += this.velocidadx;
          if(this.x > LIMITE_DER) this.x = LIMITE_DER;
      }
  }
  //Para imprimir el coche desde fuera de la clase si no se pudiera poner el metodo print()
  // let coche = new Coche();
  // coche.print();
  
  class Obstaculo{
    // canvas = document.getElementById("canvas");
      constructor(){
          this.x = 0;
          this.y = -40;
          this.w = Math.floor(Math.random() * (LIMITE_DER - LIMITE_IZQ)/2 - 100) + 100;
          this.h = Math.floor(Math.random() * (canvas.width - this.w));
          this.velocidady = 10;
          this.color = "red";
      }
      print(ctx){
          ctx.fillstyle = this.color;
          ctx.fillRect(this.x, this.y, this.w, this.h,)
      }
      move(){
          this.y += this.velocidady;
      }
  }
  
  class Juego{
    //  canvas = document.getElementById("canvas");
    //  ctx = canvas.getContext("2d");
      constructor(){

        this.canvas = canvas;
        this.ctx = ctx;
          this.roadImg = new Image();
          this.roadImg.src = "images/road.png";
          this.coche = new Coche();
          //this.obstaculo = new Obstaculo();
          this.obstaculos = [];
          this.score = 0;
          this.intervalId = undefined;
          this.iteracion = 0;
          this.roadImg.addEventListener("load", () => {
              ctx.drawImage(this.roadImg, this.x, this.y, this.w, this.h);
      });
    }
    
      start(){
       if(!this.intervalId){
          this.intervalId = setInterval(() => {
              this.iteracion++;
              
          //Borrar
          this.clear();
          //control de colisiones y recalcular posiciones de obstaculos, de coche no hace falta porque no se mueve solo de manera automatica.
          this.recalculate();
          //repintar en este orden: fondo, coche, obstaculos
          this.print();
  
       }, 20);
      }
    }
      stop(){
          if (this.IntervalId) clearInterval(this.intervalId);
      }
      clear(){
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.heigth);
      }
      recalculate(){  
        //si iteracion = 70, creo obstaculo y lo anado al array
          if(this.iteracion == 70){
          //creo obstaculo
          let obstaculo = new Obstaculo(this.canvas);
          //lo anado al array
          this.obstaculos.push(obstaculo);
          this.score++;
          this.iteracion = 0;
          
          }
          
          //recorro array obstaculo
          //mover obstaculo y controlo colisiones
          this.obstaculos.forEach(obstaculo => {
              obstaculo.move();
              if(!(this.coche.x + this.coche.w < obstaculo.x || this.coche.x > obstaculo.x + obstaculo.w || this.coche.y > obstaculo.y + obstaculo.h || this.coche.y + this.coche.h < obstaculo.y)){
                  this.stop();
          }});
  
      }
      print(){
          this.ctx.drawImage(this.roadImg, 0, 0, this.canvas.width, this.canvas.heigth);
          this.coche.print(this.ctx);
          this.obstaculos.forEach(obstaculo => {
              obstaculo.print(this.ctx);
        
          });
          this.score.fillText("Score: ", this.score);
      }
      update(){
  
      }
  
  }
  
  let juego = new Juego();
  
  document.getElementById('start-button').onclick = () => {
      startGame();
    };
  
    function startGame() {
      juego.start();
    }
    document.body.addEventListener("keydown", (event) => {
      switch(event.key) {
          case "ArrowLeft":
              juego.coche.moveIzq();
          break;
          case "ArrowRight":
              juego.coche.moveDer();
          break;
      } 
    });
  }