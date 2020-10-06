const main = () => {
  const canvas = document.getElementById(`myCanvas`);
  //   console.log(canvas.width);
  //   console.log(canvas.height);

  let state = true;
  let count = 0;

  // ball object
  const ball = {
    x_position: canvas.width / 2,
    y_position: 10,
    x_speed: 0,
    y_speed: 30,
    diameter: 10,
  };
  const gravity = 2.5;

  // controller object
  const controller = {
    x_position: canvas.width / 2 - 5,
    y_position: 0,
    length: 40,
  };

  // initialize state
  const ctx = canvas.getContext(`2d`);

  // add event handler for moving keyboard
  $(document).keydown((event) => {
    switch (event.which) {
      case 37:
        controller.x_position -= 5;
        break;
      case 39:
        controller.x_position += 5;
        break;
    }
  });

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // create the ball
    ctx.beginPath();
    ctx.fillStyle = `red`;
    ctx.arc(
      ball.x_position,
      ball.y_position,
      ball.diameter / 2,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // create the controller
    ctx.beginPath();
    ctx.moveTo(controller.x_position, canvas.height - controller.y_position);
    ctx.lineTo(
      controller.x_position + controller.length,
      canvas.height - controller.y_position
    );
    ctx.lineWidth = 5;
    ctx.stroke();
  };

  const update = () => {
    ball.y_speed += gravity;

    ball.x_position += ball.x_speed;
    ball.y_position += ball.y_speed;

    // simulate collision down
    if (ball.y_position >= canvas.height) {
      // check if successful return
      if (
        controller.x_position <= ball.x_position &&
        controller.x_position + controller.length >= ball.x_position
      ) {
        // successful return
        ball.y_speed = -40;
        ball.x_speed += (Math.random() - 0.5) * 10;
        count++;
      } else {
        state = false;
      }
    } else if (ball.x_position <= 0 || ball.x_position >= canvas.width) {
      // simulate left - right collision

    }

    if (!state) {
      alert(`you score ${(count - 1) * 10}`);
    }
    draw();
  };

  // run in a set interval
  setInterval(update, 10);
};

$(document).ready(main);
