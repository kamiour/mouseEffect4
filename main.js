let number = 400;
let diameter = 3;
let initialLeft = [];
let initialTop = [];
let points = [];
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
    console.log(index);
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

    for (let p = 0; p < points.length; p++) {
      elementsArr[p].style.left = (points[p].x)*7 + window.innerWidth/2 - 87.5;
      elementsArr[p].style.top = (points[p].y)*7 + window.innerHeight/2 - 87.5;
    }
});

$('.btn').mouseout(function() {
    for (let p = 0; p < points.length; p++) {
        elementsArr[p].style.left = initialLeft[p];
        elementsArr[p].style.top = initialTop[p];
    }
});
