/*
Squirming-and-super-high-on-acid-caterpillars-in-a-displaycase-maker. 

Rules
1. In the beginning, draw a caterpillar.
2. Draw their footsteps.
3. Make them move.
4. Be sure they're doing acid.
5. When you touch their displaycase, they stop moving.
6. Touching their displaycase too much will kill them.
*/

var rando1x, rando3x, rando5x, rando7x;
var rando2y, rando4y, rando6y, rando8y;

var red1, green1, blue1, alpha1;

var stepp;
var caterpillar = [];

var taps = 0;
var maxTaps;

var mySound;

function preload() {
    mySound = loadSound('assets/shake.wav');
    
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    
    //makes a random number of Caterpillars between 5 and 20
    var randoNcaters = random(5, 20); 
    
    for (var i = 0; i < randoNcaters; i++) {
        caterpillar[i] = new MakeCater();
    }
    
    background(0);
    
    mySound.setVolume(0.2);
    mySound.play();
    
}
    
function draw() {
    
    for (var i = 0; i < caterpillar.length; i++) {
        caterpillar[i].display();
        caterpillar[i].move();
    } 

}

function windowResized() {
    
    resizeCanvas(windowWidth, windowHeight);
    background(0);

}


//Constructor function that makes caterpillars and their inherent functions.
function MakeCater() {
    this.red1 = random(255);
    this.green1 = random(255);
    this.blue1 = random(255);
    this.alpha1 = random(255);
    
    this.stepp = random(10, 30);
    
    this.rando1x = random(width), this.rando3x = random(width), this.rando5x = random(width), this.rando7x = random(width);
    this.rando2y = random(height), this.rando4y = random(height), this.rando6y = random(height), this.rando8y = random(height);
    
        //Caterpillar
    this.display = function() {
    
        noFill();
        stroke(random(1, 255), random(1, 255), random(1, 255),random(1, 255));
        strokeWeight(5);
        bezier(this.rando1x, this.rando2y, this.rando3x, this.rando4y, this.rando5x, this.rando6y, this.rando7x, this.rando8y);
        
        this.steps = this.stepp;
        
        for (i = 0; i <= this.steps; i++) {
            this.t = i / this.steps;
            this.x = bezierPoint(this.rando1x, this.rando3x, this.rando5x, this.rando7x, this.t);
            this.y = bezierPoint(this.rando2y, this.rando4y, this.rando6y, this.rando8y, this.t);
            this.tx = bezierTangent(this.rando1x, this.rando3x, this.rando5x, this.rando7x, this.t);
            this.ty = bezierTangent(this.rando2y, this.rando4y, this.rando6y, this.rando8y, this.t); 
            this.a = atan2(this.ty, this.tx);
            this.a -= HALF_PI;
            line(this.x, this.y, cos(this.a)*20 + this.x, sin(this.a)*20 + this.y);
            line(this.x, this.y, cos(this.a)*-20 + this.x, sin(this.a)*-20 + this.y);
        
            fill(this.red1, this.green1, this.blue1, this.alpha1);
            
            ellipse(cos(this.a)*20 + this.x, sin(this.a)*20 + this.y, 10, 10);
            ellipse(cos(this.a)*-20 + this.x, sin(this.a)*-20 + this.y, 10, 10);
    
        }
        
    }
    
    //Makes them shake it. 
    this.move = function() {
        this.rando1x = this.rando1x + random(random(-20, -1), random(1, 20));
        this.rando3x = this.rando3x + random(random(-20, -1), random(1, 20));
        this.rando5x = this.rando5x + random(random(-20, -1), random(1, 20));
        this.rando7x = this.rando7x + random(random(-20, -1), random(1, 20));
        
        this.rando2y = this.rando2y + random(random(-20, -1), random(1, 20));
        this.rando4y = this.rando4y + random(random(-20, -1), random(1, 20));
        this.rando6y = this.rando6y + random(random(-20, -1), random(1, 20));
        this.rando8y = this.rando8y + random(random(-20, -1), random(1, 20));
    }
}

function mousePressed() {
    
    maxTaps = random(1, 10);
    
    if (taps < maxTaps) {
        
        noLoop();
        taps = taps + 1;
    
    } else {
    
        noLoop();
        taps = taps + 1;
    }
}

function mouseReleased() {
    
    //checks too see, if the displaycase have been tapped too many times, so that it kills the caterpillars.
    if (taps < maxTaps) {
    loop();
        
    } else {
        noLoop();
        mySound.pause();
    }
}