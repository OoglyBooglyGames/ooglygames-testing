const get = document.getElementById.bind(document);
const clickarea = get("clickarea");
const time = get("time");
var count = 0;
var isClicking = false;

const handleClick = () => {
  /* ripple effect 
  const circle = document.createElement("span");
  const diameter = Math.max(clickarea.clientWidth, clickarea.clientHeight);
  const radius = diameter / 2;
   circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - clickarea.offsetLeft - radius}px`;
  circle.style.top = `${event.clientY - clickarea.offsetTop - radius}px`;
  circle.classList.add("ripple");
   const ripple = document.getElementsByClassName("ripple")[0];
   clickarea.appendChild(circle);
   /* box shadow animation */




  clickarea.classList.add("animate-class");

  setTimeout(() => {
    clickarea.classList.remove("animate-class");
  }, 80);

  //

  // click counting stuff

  if (isClicking) count++;

  if (!isClicking) {
    // start clicking
    isClicking = true;
    clickarea.innerHTML = "CLICK!!!";

    // the 5s time for clicking
    setTimeout(() => {
      clickarea.innerHTML = "Your cps was: " + count / 5;

      // setting delay for end message
      setTimeout(() => {
        clickarea.innerHTML = "Click here to start";
        count = 0;
        isClicking = false;
      }, 2500);
    }, 5000);
  }
};

clickarea.addEventListener("click", handleClick);
clickarea.addEventListener("touchstart", handleClick);