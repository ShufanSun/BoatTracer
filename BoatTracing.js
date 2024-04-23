/**
 * Author: Shufan Sun
 */
let canvas = document.getElementById('canvas');
let context = canvas.getContext("2d");
let slider=document.getElementById("angleSlider");
// Object to store currently pressed keys
let keysPressed = {};
let rayAngle=4.8;
// Canvas background color
canvas.style.background = '#00ABCD';

// Event listener for keydown events to update keysPressed object
document.addEventListener("keydown", (event) => {
    keysPressed[event.key] = true;
});

// Event listener for keyup events to remove keys from keysPressed object
document.addEventListener("keyup", (event) => {
    delete keysPressed[event.key];
});

// Define a function to convert radians to degrees
function radiansToDegrees(radians) {
    return radians * (180 / Math.PI);
}

// Define a function to convert degrees to radians
function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

// Boat class represents the player's boat
class Boat {
    constructor(x, y, radius, color, xVelocity = 0, yVelocity = 0) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
        this.height = 0;
        this.width = 0;
        this.direction = Math.PI / 2;
    }
    // Update the direction of the boat
    updateDirection(direction) {
        this.direction = direction;
    }

    // Draw the boat on the canvas
    draw() {
        context.save(); // Save the current canvas state
        context.translate(this.x, this.y); // Translate to the boat's position
        context.rotate(this.direction); // Rotate based on the boat's direction
    
        context.lineWidth = 2;
        context.strokeStyle = this.color;
    
        // Draw the body of the boat
        context.beginPath();
        context.moveTo(0, 0); // Start from the center
        context.rotate(90);
        context.moveTo(0, 0);
        context.quadraticCurveTo(-30, 17, -20, 50); // Curve for boat body
        context.quadraticCurveTo(-10, 80, 10, 60); // Curve for boat body
        context.quadraticCurveTo(30, 20, 0, 0);
        context.closePath();
        context.fillStyle = '#FF6F61'; // Reddish color
        context.fill();
        context.stroke();

        // Draw the inner part of the boat
        context.beginPath();
        context.moveTo(0, 0);
        context.moveTo(0, 10);
        context.fillStyle = '#F3E4B5';
        context.strokeStyle = '#A52C01';
        context.quadraticCurveTo(-20, 20, -10, 50);
        context.quadraticCurveTo(-10, 60, 5, 55);
        context.quadraticCurveTo(20, 20, 0, 11);
        context.fill();
        context.stroke();
        context.beginPath();
        context.moveTo(0, 0);
        context.moveTo(0, 11);
        context.lineTo(0, 40);
        context.stroke();
        context.beginPath();
        context.moveTo(0, 0);
        context.moveTo(0, 40);
        context.lineTo(-11, 40);
        context.lineTo(11, 40);
        context.stroke();
        context.restore(); // Restore the saved canvas state
    }

    // Move the boat based on velocity
    move() {
        this.x += this.xVelocity;
        this.y += this.yVelocity;
    }
}
//randomize barrier colors
var colorArray = ['#2C3E50','#E74C3C','#ECF0F1','#3498DB','#2980B9'];

// Barriers class represents obstacles on the canvas
class Barrier {
    constructor(x, y, height, width, color) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
        this.xVelocity = 0;
        this.yVelocity = 0;
    }

    // Draw the barrier on the canvas
    draw() {
        const radius = 10; // Radius for outer rectangle
        const padding = 5; // Distance from outer to inner rectangle
        const innerRadius = 7; // Radius for inner rectangle
    
        // Draw outer rectangle
        context.beginPath();
        context.moveTo(this.x + radius, this.y);
        context.lineTo(this.x + this.width - radius, this.y);
        context.quadraticCurveTo(this.x + this.width, this.y, this.x + this.width, this.y + radius);
        context.lineTo(this.x + this.width, this.y + this.height - radius);
        context.quadraticCurveTo(this.x + this.width, this.y + this.height, this.x + this.width - radius, this.y + this.height);
        context.lineTo(this.x + radius, this.y + this.height);
        context.quadraticCurveTo(this.x, this.y + this.height, this.x, this.y + this.height - radius);
        context.lineTo(this.x, this.y + radius);
        context.quadraticCurveTo(this.x, this.y, this.x + radius, this.y);
        context.closePath();
        context.fillStyle = this.color;
        context.fill();
    
        // Draw inner rectangle
        context.beginPath();
        context.moveTo(this.x + padding + innerRadius, this.y + padding);
        context.lineTo(this.x + this.width - padding - innerRadius, this.y + padding);
        context.quadraticCurveTo(this.x + this.width - padding, this.y + padding, this.x + this.width - padding, this.y + padding + innerRadius);
        context.lineTo(this.x + this.width - padding, this.y + this.height - padding - innerRadius);
        context.quadraticCurveTo(this.x + this.width - padding, this.y + this.height - padding, this.x + this.width - padding - innerRadius, this.y + this.height - padding);
        context.lineTo(this.x + padding + innerRadius, this.y + this.height - padding);
        context.quadraticCurveTo(this.x + padding, this.y + this.height - padding, this.x + padding, this.y + this.height - padding - innerRadius);
        context.lineTo(this.x + padding, this.y + padding + innerRadius);
        context.quadraticCurveTo(this.x + padding, this.y + padding, this.x + padding + innerRadius, this.y + padding);
        context.closePath();
        context.fillStyle = "rgba(255, 255, 255, 0.5)"; // Lighter color, adjust opacity as needed
        context.fill();
    }

}


// Barriers class represents obstacles on the canvas
class Barrier2 {
    constructor(x, y,radius,colors) {
        this.x = x;
        this.y = y;
        this.radius=radius;
        this.colors=colors;
    }

    // Draw the barrier on the canvas
    draw() {
        context.save();
        context.fillStyle = this.color;
        for(let i=0;i<this.radius;i+=7){
            context.fillStyle = this.colors[i];
            context.beginPath();
            context.arc(this.x, this.y, this.radius-i, 0, Math.PI * 2);
            context.closePath();
            context.fill();
        }
        
        context.restore();
    }
}


// RayCaster class manages the boat and obstacle interactions
class RayCaster {
    constructor() {
        this.obstacles = [];
        // Initialize the boat
        this.initializeBoat(this.obstacles);
        this.rays = [];
        this.rayRange = 500;
        this.globalAngle = Math.PI;
        this.gapAngle = Math.PI /rayAngle;
        // this.gapAngle = degreesToRadians(rayAngle);
        this.currentAngle = 0;
        this.initializeFlowField(context,canvas.width,canvas.height);
        
    }
     // Method to update gapAngle
     updateGapAngle(angle) {
        this.gapAngle = angle;
    }
    initializeBoat(obstacles) {
        //make sure that the boat doesn't overlap with the obstacles
        let validPosition = false;
        while (!validPosition) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            if (!this.checkCollisionWithObstacles(x, y, obstacles)) {
                this.boat = new Boat(x, y, 10, "#EEEDDE");
                validPosition = true;
            }
        }
    }
    initializeFlowField(context,width,height) {
        this.flowField = new FlowFieldEffect(context, canvas.width, canvas.height);
        
    }

    checkCollisionWithObstacles(x, y, obstacles) {
        for (let i = 0; i < obstacles.length; i++) {
            const obstacle = obstacles[i];
            if (
                x > obstacle.x &&
                x < obstacle.x + obstacle.width &&
                y > obstacle.y &&
                y < obstacle.y + obstacle.height

            ) {
                return true;
            }
        }
        return false;
    }
     // Check collision with barriers
     checkCollisionWithBarriers(x, y) {
        for (let i = 0; i < this.obstacles.length; i++) {
            const barrier = this.obstacles[i];
            if (
                x > barrier.x &&
                x < barrier.x + barrier.width &&
                y > barrier.y &&
                y < barrier.y + barrier.height
            ) {
                return true;
            }
        }
        return false;
    }
    
    // Move the boat based on velocity, while ensuring it doesn't collide with barriers
    moveBoat() {
        const newX = this.boat.x + this.boat.xVelocity;
    const newY = this.boat.y + this.boat.yVelocity;

    if (!this.checkCollisionWithBarriers(newX, newY)) {
        this.boat.x = newX;
        this.boat.y = newY;
    } else {
        // If collision detected, reset boat velocity
        this.boat.xVelocity = 0;
        this.boat.yVelocity = 0;
    }
    }
    beam() {
        this.currentAngle = this.gapAngle / 2;
    
        // Create rays
        for (let k = 0; k < 1000; k++) {
            this.currentAngle += (this.gapAngle / 500);
    
            // Calculate the coordinates of the tip of the boat relative to its position and direction
            const tipX = this.boat.x + (this.boat.radius * Math.cos(this.boat.direction));
            const tipY = this.boat.y + (this.boat.radius * Math.sin(this.boat.direction));
            // Calculate the offset from the tip of the boat
            const offsetX = 1 + 10 * Math.cos(this.boat.direction); // Adjust the offset as needed
            const offsetY = 10 * Math.sin(this.boat.direction); // Adjust the offset as needed
    
            // Calculate the coordinates of the start point of the beam
            const startX = tipX + offsetX;
            const startY = tipY + offsetY;
    
            
            const beamDirection = this.boat.direction; // Adjust the angle as needed
    
            // Calculate the distance of the ray from the boat
            const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
    
            // Calculate the alpha value based on the distance from the boat
            const alpha = 1 - (distance / this.rayRange);
    
            // Create rays from the tip of the boat with adjusted alpha
            let ray = new Boat(
                startX,
                startY,
                1,
                `rgba(255, 255, 255, ${alpha})`, // Use rgba color with alpha
                ((this.rayRange * (Math.cos(this.globalAngle + this.currentAngle)))) / this.rayRange * 2,
                ((this.rayRange * (Math.sin(this.globalAngle + this.currentAngle)))) / this.rayRange * 2,
                beamDirection
            );
    
            ray.collided = 0;
            ray.lifespan = this.rayRange - 1;
            this.rays.push(ray);
        }
    
        // Update the direction of the boat based on the direction of the first ray
        this.boat.updateDirection(this.globalAngle + this.gapAngle / 2);

        // Function to check if a ray intersects with the boat
        function intersectsBoat(ray, center, radius) {
            const dx = ray.x - center.x;
            const dy = ray.y - center.y;
            return dx * dx + dy * dy <= radius * radius;
        }
        // Move and detect collisions with obstacles and barriers
        for (let i = 0; i < this.rayRange / 2; i++) {
            for (let j = 0; j < this.rays.length; j++) {
                if (this.rays[j].collided === 1) {
                    // Handle collision with barriers
                } else {
                    this.rays[j].move();
                    this.rays[j].lifespan--;
                    if (this.rays[j].lifespan <= 0) {
                         // Set 'collided' flag if the ray's lifespan is zero or less
                        this.collided = 1;
                    }
                    // Check collision with obstacles
                    for (let k = 0; k < this.obstacles.length; k++) {
                        const obstacle = this.obstacles[k];
                        if (obstacle instanceof Barrier) {
                            //check the rectangular shape collision
                            if (this.rays[j].x > obstacle.x &&
                                this.rays[j].y > obstacle.y &&
                                this.rays[j].x < obstacle.x + obstacle.width &&
                                this.rays[j].y < obstacle.y + obstacle.height) {
                                this.rays[j].collided = 1;
                            }
                            else if (
                                   // Check collision with circular obstacles at each corner
                                intersectsBoat(this.rays[j], { x: obstacle.x, y: obstacle.y }, obstacle.radius) ||
                                intersectsBoat(this.rays[j], { x: obstacle.x + obstacle.width, y: obstacle.y }, obstacle.radius) ||
                                intersectsBoat(this.rays[j], { x: obstacle.x, y: obstacle.y + obstacle.height }, obstacle.radius) ||
                                intersectsBoat(this.rays[j], { x: obstacle.x + obstacle.width, y: obstacle.y + obstacle.height }, obstacle.radius)
                            ) {
                                this.rays[j].collided = 1;
                            }
                        } else if (obstacle instanceof Barrier2) {
                            // Check collision with circular obstacles at each corner
                            const dx = this.rays[j].x - obstacle.x;
                            const dy = this.rays[j].y - obstacle.y;
                            const distance = Math.sqrt(dx * dx + dy * dy);
                            if (distance < obstacle.radius) {
                                this.rays[j].collided = 1;
                            }
                        }
                    }
                }
            }
        }
    }
    

    // Draw the boat and rays
    draw() {
        this.beam();
        this.flowField.timer++;
        if(this.flowField.timer>this.flowField.interval){
            for(let y=0;y<canvas.height;y+=this.flowField.cellSize){
                for(let x=0;x<canvas.width;x+=this.flowField.cellSize){
                    this.flowField.draw(
                        x,y
                    );
                }
            }
        }
        this.boat.draw();
        this.flowField.angle+=0.1;
         // Increment the timer
   
        // this.flowField.draw(
        //     canvas.width/2+Math.cos(this.flowField.angle)*100,
        //      canvas.height/2+Math.cos(this.flowField.angle)*100
        // );
        context.beginPath();
        context.moveTo(this.boat.x, this.boat.y);
    
        // Define the maximum opacity value
        const maxOpacity = 0.5; // Adjust as needed
    
        for (let i = 0; i < this.rays.length; i++) {
            // Calculate the distance from the boat for the current ray
            const distanceFromBoat = Math.sqrt((this.rays[i].x - this.boat.x) ** 2 + (this.rays[i].y - this.boat.y) ** 2);
    
            // Calculate the alpha value based on the distance from the boat
            const alpha = Math.max(0, maxOpacity - (distanceFromBoat / this.rayRange) * maxOpacity);
    
            // Set the stroke color with adjusted alpha
            context.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    
            // Draw the ray
            context.lineTo(this.rays[i].x, this.rays[i].y);
            
        }
    
        // Apply the stroke color to the rays
        context.stroke();
        context.fillStyle = "#FEE267";
        context.fill();

        context.moveTo(this.boat.x, this.boat.y);
    
      
        this.rays = [];
    }

    control() {
        let newX = this.boat.x + this.boat.xVelocity;
        let newY = this.boat.y + this.boat.yVelocity;
    
        
        if (keysPressed['d']) {
            this.globalAngle += 0.01;
        }
        if (keysPressed['a']) {
            this.globalAngle -= 0.01;
        }
        if (keysPressed['ArrowUp']) {
            //check if the boat hits the barriers
            if (!this.checkCollisionWithBarriers(newX, newY)) {
                this.boat.y -= 2;}
                else{
                    this.boat.y+=3;
                }
        }
        if (keysPressed['ArrowRight']) {
            if (!this.checkCollisionWithBarriers(newX, newY)) 
            this.boat.x += 2;
        else{
            this.boat.x-=3;
        }
        }
        if (keysPressed['ArrowDown']) {
            if (!this.checkCollisionWithBarriers(newX, newY)) 
            this.boat.y += 2;
        else{
            this.boat.y-=3;
        }
        }
        if (keysPressed['ArrowLeft']) {

            if (!this.checkCollisionWithBarriers(newX, newY)) 
            this.boat.x -= 2;
        else{
            this.boat.x+=3;
        }
        }
    
        this.moveBoat();
    }
}


class FlowFieldEffect {
    constructor(context, width, height) {
        this.context =context;
        this.width = canvas.width;
        this.height = canvas.height;
        this.context.strokeStyle = "black";
        this.angle=0;
        this.lastTime=0;
        this.interval=1000/600;
        this.timer=0;
        this.cellSize=15;

    }

    // Draw method to draw the effect on the canvas
    draw(x, y) {
        const length=300;
        this.context.beginPath();
        this.context.moveTo(x, y);
        this.context.lineTo(x+5, y+5);
        this.context.stroke();
    }
}

// Create an instance of the RayCaster
let rayCaster = new RayCaster();

// Generate obstacles
for (let k = 0; k < 5; k++) {
    let collision = true;
    let x, y, width, height;
    while (collision) {
        // Generate random position and dimensions for the obstacle
        x = Math.random() * canvas.width;
        y = Math.random() * canvas.height;
        width = 5 + Math.random() * 150;
        height = 5 + Math.random() * 170;

        // Check if the new obstacle overlaps with any existing obstacles
        collision = rayCaster.obstacles.some(obstacle => {
            return (
                x < obstacle.x + obstacle.width &&
                x + width > obstacle.x &&
                y < obstacle.y + obstacle.height &&
                y + height > obstacle.y
            );
        });
    }

    // Create the obstacle and add it to the obstacles array
    let barrier = new Barrier(x, y, width, height, "#202039");
    rayCaster.obstacles.push(barrier);

    // Create the second type of obstacle
    let barrier2Colors = [];
    for (let i = 0; i < 60; i++) {
        let randomColor =
            "rgb(" +
            Math.floor(Math.random() * 256) +
            "," +
            Math.floor(Math.random() * 256) +
            "," +
            Math.floor(Math.random() * 256) +
            ")";
        barrier2Colors.push(randomColor);
    }

    let barrier2Radius = 5 + Math.random() * 60;
    let barrier2Collision = true;
    while (barrier2Collision) {
        // Generate random position for the second type of obstacle
        x = Math.random() * canvas.width;
        y = Math.random() * canvas.height;

        // Check if the new obstacle overlaps with any existing obstacles
        barrier2Collision = rayCaster.obstacles.some(obstacle => {
            return (
                Math.sqrt((x - obstacle.x) ** 2 + (y - obstacle.y) ** 2) <
                barrier2Radius + Math.max(obstacle.width, obstacle.height)
            );
        });
    }

    let barrier2 = new Barrier2(x, y, barrier2Radius, barrier2Colors);
    rayCaster.obstacles.push(barrier2);
}


// Render loop
window.setInterval(function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
    rayCaster.draw();
    rayCaster.control();
    // Draw Barrier objects first
    for (let p = 0; p < rayCaster.obstacles.length; p++) {
        if (rayCaster.obstacles[p] instanceof Barrier) {
            rayCaster.obstacles[p].draw();
        }
    }

    // Draw Barrier2 objects next
    for (let p = 0; p < rayCaster.obstacles.length; p++) {
        if (rayCaster.obstacles[p] instanceof Barrier2) {
            rayCaster.obstacles[p].draw();
        }
    }

}, 15);

// Function to check if a point intersects with a circle
function intersects(object, point) {
    var areaX = point.x - object.x;
    var areaY = point.y - object.y;
    return areaX * areaX + areaY * areaY <= object.radius * object.radius * 1.1;
}
