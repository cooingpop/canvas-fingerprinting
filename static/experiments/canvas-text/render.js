
function render(elementid, pixels) {
  renderdiff(elementid, pixels, null);
}

function renderdiff(elementid, pixels1, pixels2) {
  var canvas = document.getElementById(elementid);
  var context = canvas.getContext("2d");
  var imageData = context.getImageData(0,0, canvas.width, canvas.height);

  for(var p in pixels1) {
    imageData.data[p] = pixels1[p];
  }

  if(pixels2 !== null) {
    for(var p in pixels2) {
      var tmp = pixels2[p];
      var tmp2 = imageData.data[p];
      imageData.data[p] = Math.abs(imageData.data[p] - pixels2[p]);
    }
  }

  context.putImageData(imageData,0,0);
}


function setPixelAt(data, n) {
  var loc = Math.floor(parseInt(n) / 4) * 4;

  data[ loc ] = 0;
  data[ loc +1 ] = 0;
  data[ loc +2 ] = 0;
  data[ loc +3 ] = 255;

  return data;
}

function renderdiffmap(elementid, pixels1, pixels2) {
  var canvas = document.getElementById(elementid);
  var context = canvas.getContext("2d");
  var imageData = context.getImageData(0,0, canvas.width, canvas.height);

  for(var p in pixels1) {
    if( !(p in pixels2) || (pixels1[p] !== pixels2[p])) {
      imageData.data = setPixelAt(imageData.data, p);
    }
  }

  for(var p in pixels2) {
    if( !(p in pixels1) || (pixels1[p] !== pixels2[p])) {
      imageData.data= setPixelAt(imageData.data, p);
    }
  }

  context.putImageData(imageData,0,0);
}

