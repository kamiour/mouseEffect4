let number = 100;
let diameter = 4;
let initialLeft = [];
let initialTop = [];
let points = [];
let maxWidth = 250;

for (let i = 0; i < number; i++) {
  $("#one").append( '<div id="move-'+i+'" class="move"></div>');
}

let elementsArr = $(".move");
for (let i = 0; i < elementsArr.length; i++) {
  elementsArr[i].style.transitionDuration = '1.5s';
  elementsArr[i].style.left = (window.innerWidth * Math.random());
  elementsArr[i].style.top = (window.innerHeight * Math.random());
  elementsArr[i].style.width = diameter;
  elementsArr[i].style.height = diameter;
  elementsArr[i].style.backgroundColor = '#fffc00';
  initialLeft[i] = elementsArr[i].style.left;
  initialTop[i] = elementsArr[i].style.top;
};
    
$('img').click(function() {
    points = [];
    if(!this.canvas) {
        this.canvas = $('<canvas />')[0];
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.getContext('2d').drawImage(this, 0, 0, this.width, this.height);
    }

    let startLeft = $('img')[0].offsetLeft;
    let startTop = $('img')[0].offsetTop;

    for (let i = 0; i<this.width; i+=4) {
      for (let j = 0; j<this.height; j+=4) {
        var pixelData = this.canvas.getContext('2d').getImageData(i, j, 1, 1).data;
        if (pixelData[0] !== 255 && pixelData[1] == !255 && pixelData[2] == !255) {
          points[points.length] = {
            x: i,
            y: j,
          };
          console.log('black');
        } else console.log('white');
      }
    }

    for (let p = 0; p < points.length; p++) {
      elementsArr[p].style.left = points[p].x + startLeft;
      elementsArr[p].style.top = points[p].y + startTop;
    }
});
