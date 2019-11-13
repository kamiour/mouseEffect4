let number = 500;
let diameter = 4;
let initialLeft = [];
let initialTop = [];
let points = [];
let counter = 0;
for (let i = 0; i < number; i++) {
  $("#one").append( '<div id="move-'+i+'" class="move"></div>');
}

let elementsArr = $(".move");
for (let i = 0; i < elementsArr.length; i++) {
  elementsArr[i].style.transitionDuration = '1s';
  elementsArr[i].style.left = (window.innerWidth * Math.random());
  elementsArr[i].style.top = (window.innerHeight * Math.random());
  elementsArr[i].style.width = diameter;
  elementsArr[i].style.height = diameter;
  elementsArr[i].style.backgroundColor = '#fffc00';
  initialLeft[i] = elementsArr[i].style.left;
  initialTop[i] = elementsArr[i].style.top;
};
    
$('img').click(async function() {
    points = [];
    if(!this.canvas) {
        this.canvas = $('<canvas />')[0];
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.getContext('2d').drawImage(this, 0, 0, this.width, this.height);
    }

    let startLeft = this.offsetLeft;
    let startTop = this.offsetTop;

    for (let i = 0; i<this.width; i+=diameter+1) {
      for (let j = 0; j<this.height; j+=diameter+1) {
        var pixelData = this.canvas.getContext('2d').getImageData(i, j, 1, 1).data;
        if (pixelData[0] !== 255 && pixelData[1] == !255 && pixelData[2] == !255) {
          points[points.length] = {
            x: i,
            y: j,
          };
        }
      }
    }

    for (let p = 0; p < elementsArr.length; p++) {
        elementsArr[p].style.left = initialLeft[p];
        elementsArr[p].style.top = initialTop[p];
    }

    if (counter > 0) {
        await new Promise((resolve, reject) => setTimeout(resolve, 1000));
        console.log(counter);
    }

    for (let p = 0; p < points.length; p++) {
      elementsArr[p].style.left = points[p].x + startLeft - diameter/2;
      elementsArr[p].style.top = points[p].y + startTop - diameter/2;
    }
    counter++;
});
