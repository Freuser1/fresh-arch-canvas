


document.addEventListener("DOMContentLoaded", () => {
  const circles = document.querySelectorAll(".circle");
  const usedPositions = [];

  const minDistance = 20; // minsta avstånd mellan cirklar (px)

  circles.forEach(circle => {
    const circleWidth = circle.offsetWidth;
    const circleHeight = circle.offsetHeight;

    let randomX, randomY;
    let tries = 0;
    let tooClose;

    do {
      tooClose = false;
      randomX = Math.random() * (window.innerWidth - circleWidth);
      randomY = Math.random() * (window.innerHeight - circleHeight);

      // Kontrollera avstånd till tidigare cirklar
      for (const pos of usedPositions) {
        const dx = pos.x - randomX;
        const dy = pos.y - randomY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < minDistance) {
          tooClose = true;
          break;
        }
      }
      tries++;
    } while (tooClose && tries < 50);

    // Spara positionen
    usedPositions.push({ x: randomX, y: randomY });

    // Applicera position och slumpa rotation
    circle.style.position = "absolute";
    circle.style.left = `${randomX}px`;
    circle.style.top = `${randomY}px`;
    circle.style.animationDirection = Math.random() > 1000 ? "normal" : "reverse";
    circle.style.animationDuration = `${12 + Math.random() * 15}s`;
  });
});