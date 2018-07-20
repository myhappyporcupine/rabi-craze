const EASES = {
  LINEAR: (x) => x,
  CUBIC:  (x) => Math.pow(x, 3),
  SINE:   (x) => Math.sin(x * Math.PI/2)
};

const BEHAVIORS = {
  STOP:    0,
  REPEAT:  1,
  REVERSE: 2
};

class Tween {
  constructor(start, end, duration, ease=EASES.LINEAR, behavior=BEHAVIORS.STOP) {
    this.start = start;
    this.end = end;
    this.duration = duration;
    this.ease = ease;
    this.behavior = behavior;
    this.counter = 0;
    this.tweenFunction = createTweenFunction(this.start, this.end, this.duration, this.ease);
  }
  step() {
    const current = this.tweenFunction(this.counter++);
    if (this.counter >= this.duration) {
      switch (this.behavior) {
        case BEHAVIORS.STOP:
          this.counter = this.duration;
          break;
        case BEHAVIORS.REPEAT:
          this.counter = 0;
          break;
        case BEHAVIORS.REVERSE:
          const temp = this.start;
          this.start = this.end;
          this.end = temp;
          this.counter = 0;
          this.tweenFunction = createTweenFunction(this.start, this.end, this.duration, this.ease);
          break;
        default:
          break;
      }
    }
    return current;
  }
}

function createTweenFunction(start, end, duration, ease) {
  return (frame) => start + ease((frame / duration)) * (end - start);
}
