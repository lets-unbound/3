const toggleButton = document.getElementById('toggleButton');
const sectionContent = document.getElementById('sectionContent');
const c= document.getElementById("canvas")
const closeButton=document.getElementById("closeButton")
const pb=document.getElementById("pb")

toggleButton.addEventListener('click', () => {
  if (sectionContent.style.display === 'none') {
    sectionContent.style.display = 'block';
    c.style.display='none'
  } else {
    sectionContent.style.display = 'none';
    c.style.display="block"
  }

  
});


closeButton.addEventListener('click',()=>{
  sectionContent.style.display = 'none';
  c.style.display="block"
})


pb.addEventListener('click',()=>{
  sectionContent.style.display = 'none';
  c.style.display="block"
})


const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let mouseX = 0;
    let mouseY = 0;
   
    let triMode = false;
    let dots = [];
    let points = [];

    

    function activateTriMode() {
      patternMode = false;
      dotsMode = false;
      triMode = true;
      clearCanvas();
      alert("Use mouse/touch to create a triangle with three dots")
    }


    function handleInput(x, y) {
      const rect = canvas.getBoundingClientRect();
      mouseX = x - rect.left;
      mouseY = y - rect.top;

      
      if (triMode) {
        Triangle();
      }
    }

    function handleTouchEvent(e) {
      e.preventDefault();
      const touch = e.touches[0];
      handleInput(touch.clientX, touch.clientY);
    }

    function handleClickEvent(e) {
      handleInput(e.clientX, e.clientY);
    }

    canvas.addEventListener('mousemove', (e) => {
      handleInput(e.clientX, e.clientY);
    });

    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      handleInput(touch.clientX, touch.clientY);
    }, { passive: false });

    canvas.addEventListener('click', (e) => {
      handleInput(e.clientX, e.clientY);
    });
    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (points.length < 3) {
            points.push({ x, y });
        }


        if (points.length === 3) {
          setTimeout(() => {
            points = [];
          }, 3000);
        }

        clearCanvas()

        if(triMode){
        Triangle();
        

      }
    });

    function clearCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    
    

    function getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }


    function Triangle(){
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the points
      ctx.fillStyle = 'white';
      points.forEach((point) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw the triangle
      if (points.length === 3) {
        const p1 = points[0];
        const p2 = points[1];
        const p3 = points[2];

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.closePath();

        // Set the color for the two non-hypotenuse lines
        ctx.strokeStyle = 'white'; // Change to the desired color for the non-hypotenuse lines
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = 'orange'; // Change the color and opacity as desired
        ctx.fill();

        // Draw the hypotenuse line with a different color
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.strokeStyle = 'blue'; // Change to the desired color for the hypotenuse line
        ctx.stroke();

        const hypotenuseLength = Math.sqrt(
          Math.pow(p3.x - p1.x, 2) + Math.pow(p3.y - p1.y, 2)
        );
        const hypotenuseAngle = Math.atan2(p3.y - p1.y, p3.x - p1.x);
        
        // Draw the hypotenuse angle
        ctx.font = '16px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText(
          `Hypotenuse Angle: ${Math.round((hypotenuseAngle * 180) / Math.PI)}°`,
          p1.x + 10,
          p1.y - 10
        );
        

        // Draw the hypotenuse length
        ctx.font = '16px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText(`Hypotenuse Length: ${Math.round(hypotenuseLength)}`, p3.x - 150, p3.y - 10);

        const base = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
        const height = Math.abs(p3.y - p1.y);
        const area = 0.5 * base * height;

        ctx.font = '16px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(`Triangle Area: ${Math.round(area)}`, p1.x + 10, p1.y + 20);
      }
    }

    function clearScreen(){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function animate() {
      requestAnimationFrame(animate);

      // Insert any additional animations or updates here

    }

    animate();
