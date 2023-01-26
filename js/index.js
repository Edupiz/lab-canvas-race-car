window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  }

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  
  let imageRoad
  let car

  function startGame() {
    // console.log(document.getElementsByTagName("body")[0]);
     imageRoad = document.createElement("img");
     imageRoad.src = "images/road.png"
     imageRoad.addEventListener("load", () => {ctx.drawImage(imageRoad, 0, 0, 500, 700);});
    car = document.createElement("img");
    car.src = "images/car.png"
    car.addEventListener("load", () => {ctx.drawImage(car, 225, 600, 50, 90);});

    setInterval(()=>{
      // console.log("setinterval");
      update();
  }, 16);
}

    class Movement{
      constructor(velocidadx, x){
        this.velocidadx = velocidadx;
        this.x = x;
      }
       print(){
        ctx.drawImage(car, this.x, 600, 50, 90)
      }
      ;
    }
    
    let playerCar = new Movement(10, 225);    //valor inicial
    let update = ()=>{
      //limpiar canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(imageRoad, 0, 0, canvas.width, canvas.height);
      //repintar
      playerCar.print();
   }
   



document.getElementsByTagName("body")[0].addEventListener("keydown", (event)=>{
  switch(event.key){
    case "ArrowLeft":
        playerCar.x -= playerCar.velocidadx;
         if(playerCar.x < 50) playerCar.x = 50;
        break;
    case "ArrowRight":
        playerCar.x += playerCar.velocidadx;
         if(playerCar.x > 400) playerCar.x = 400;
        break;

   }
  });
}

// class car {
//   constructor(game){
//     this.game = game;
//     this.x = x;
//     this.y = y;
//     this.img = img;
//   }
//   imagenCoche(){
    
//   }
// }