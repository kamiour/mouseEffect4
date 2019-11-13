let number = 300;
let diameter = 8;
let scale = 15;
let initialLeft = [];
let initialTop = [];
let points = [];
let newPoints = [];
for (let i = 0; i < number; i++) {
  $("#one").append( '<div id="move-'+i+'" class="move"></div>');
}

let elementsArr = $(".move");
for (let i = 0; i < elementsArr.length; i++) {
  elementsArr[i].style.left = (window.innerWidth * Math.random());
  elementsArr[i].style.top = (window.innerHeight * Math.random());
  elementsArr[i].style.width = diameter;
  elementsArr[i].style.height = diameter;
  initialLeft[i] = elementsArr[i].style.left;
  initialTop[i] = elementsArr[i].style.top;
};
    
$('.btn').mouseenter(function() {
    let index = this.id;
    points = [];
    let img = $('img')[index];
    if(!img.canvas) {
        img.canvas = $('<canvas />')[0];
        img.canvas.width = img.width;
        img.canvas.height = img.height;
        img.canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
    }

    for (let i = 0; i<img.width; i++) {
      for (let j = 0; j<img.height; j++) {
        var pixelData = img.canvas.getContext('2d').getImageData(i, j, 1, 1).data;
        if (pixelData[0] !== 255 && pixelData[1] == !255 && pixelData[2] == !255) {
          points[points.length] = {
            x: i,
            y: j,
          };
        }
      }
    }
    console.log(points.length);
    let norm = points.length/number;
    console.log(norm);

    for (let i = 0; i<number; i++) {
        newPoints[i] = points[Math.floor(i*norm)]
    }
    console.log(newPoints);

    for (let p = 0; p < newPoints.length; p++) {
      elementsArr[p].style.left = (newPoints[p].x)*scale + window.innerWidth/2 - 0.5*scale*25;
      elementsArr[p].style.top = (newPoints[p].y)*scale + window.innerHeight/2 - 0.5*scale*25;
    }
});

$('.btn').mouseout(function() {
    for (let p = 0; p < newPoints.length; p++) {
        elementsArr[p].style.left = initialLeft[p];
        elementsArr[p].style.top = initialTop[p];
    }
});
