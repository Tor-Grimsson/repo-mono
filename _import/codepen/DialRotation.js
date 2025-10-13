const circle = document.querySelector(".main-circle"),
      imageURLs = [
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/flair-36.png",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/flair-25.png",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/flair-24.png"
      ],
      images = placeImages(imageURLs), 
      spin = gsap.timeline({repeat:-1, defaults:{ duration:50, ease:"none"}})
        .to(circle, {rotation:360})
        .to(images, {rotation:-360}, 0);

//feed an array of URLs into this function and it'll place the images evenly around the edge of the circle, setting them to whatever width/height you define (in pixels)
function placeImages(imageURLs) {
  let angleIncrement = Math.PI * 2 / imageURLs.length,
      radius = circle.offsetWidth / 2,
      images = [],
      image, angle, i;
  for (i = 0; i < imageURLs.length; i++) {
    image = new Image();
    images.push(image);
    circle.appendChild(image);
    angle = angleIncrement * i;
    gsap.set(image, {
      attr:{ src: imageURLs[i] },
      position:"absolute", 
      top:0, 
      left:0, 
      xPercent:-50, 
      yPercent:-50,
      transformOrigin:"50% 50%",
      x: radius + Math.cos(angle) * radius,
      y: radius + Math.sin(angle) * radius
    });
  }
  return images;
}
 
Draggable.create('.main-circle', {
    type: 'rotation',
    inertia:true,
    onPressInit: () => spin.pause(),
    onDrag:function() {
      //just convert the rotation into a progress value for the spin timeline. Easy peasy. Very performant too. 
      var angle = (this.rotation + 360 * 100000) % 360; //ensure that the value is always between 0 and 360. Don't let it go negative or beyond 360. 
      spin.progress(angle/360);
    },
    onThrowUpdate: function(){
      var angle = (this.rotation + 360 * 100000) % 360;
      spin.progress(angle/360);
    },
    onThrowComplete: () => {
      spin.resume();
      //ease back into the normal spin by tweening the timeScale from 0 to 1
      gsap.fromTo(spin, {timeScale:0}, {duration:1, timeScale:1, ease:"power1.in"});
    }
});

document.body.addEventListener("click", (e) => {
  console.log("clicking")
})
