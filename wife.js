class Wife {
  constructor(xPos, yPos, bodyRadius) {
    // Metrics
    this.xPos       = xPos;
    this.yPos       = yPos;
    this.bodyRadius = bodyRadius;
    // Rotation Angles
    this.bodyRotation     = 0;
    this.headRotation     = 0;
    this.leftArmRotation  = 0;
    this.rightArmRotation = 0;
    // Rotation Limits
    this.maxBodyRotation     =  Infinity;
    this.minBodyRotation     = -Infinity;
    this.maxHeadRotation     =  Math.PI/8;
    this.minHeadRotation     = -Math.PI/8;
    this.maxLeftArmRotation  =  Math.PI/6;
    this.minLeftArmRotation  = -Math.PI/6;
    this.maxRightArmRotation =  Math.PI/6;
    this.minRightArmRotation = -Math.PI/6;
    // Deltas
    this.xPosDelta             =  5;
    this.yPosDelta             =  2;
    this.bodyRotationDelta     =  0.04;
    this.headRotationDelta     =  0.05;
    this.leftArmRotationDelta  =  0.06;
    this.rightArmRotationDelta = -0.06;
    // Appearance Booleans
    this.isHair       = true;
    this.isHelperRect = false;
  }

  move() {
    this.xPos += this.xPosDelta;
    this.yPos += this.yPosDelta;
  }

  rotateBody() {
    this.bodyRotation += this.bodyRotationDelta;
    if (this.bodyRotation > this.maxBodyRotation) {
      this.bodyRotation = this.maxBodyRotation;
      this.bodyRotationDelta *= (-1);
    } else if (this.bodyRotation < this.minBodyRotation) {
      this.bodyRotation = this.minBodyRotation;
      this.bodyRotationDelta *= (-1);
    }
  }

  rotateHead() {
    this.headRotation += this.headRotationDelta;
    if (this.headRotation > this.maxHeadRotation) {
      this.headRotation = this.maxHeadRotation;
      this.headRotationDelta *= (-1);
    } else if (this.headRotation < this.minHeadRotation) {
      this.headRotation = this.minHeadRotation;
      this.headRotationDelta *= (-1);
    }
  }

  rotateLeftArm() {
    this.leftArmRotation += this.leftArmRotationDelta;
    if (this.leftArmRotation > this.maxLeftArmRotation) {
      this.leftArmRotation = this.maxLeftArmRotation;
      this.leftArmRotationDelta *= (-1);
    } else if (this.leftArmRotation < this.minLeftArmRotation) {
      this.leftArmRotation = this.minLeftArmRotation;
      this.leftArmRotationDelta *= (-1);
    }
  }

  rotateRightArm() {
    this.rightArmRotation += this.rightArmRotationDelta;
    if (this.rightArmRotation > this.maxRightArmRotation) {
      this.rightArmRotation = this.maxRightArmRotation;
      this.rightArmRotationDelta *= (-1);
    } else if (this.rightArmRotation < this.minRightArmRotation) {
      this.rightArmRotation = this.minRightArmRotation;
      this.rightArmRotationDelta *= (-1);
    }
  }

  boundingRect() {
    // {x, y, width, height} where (x,y) is for upper-left corner
    return {
      x: this.xPos - 2 * this.bodyRadius,
      y: this.yPos - 2 * this.bodyRadius,
      width: 4 * this.bodyRadius,
      height: 4 * this.bodyRadius
    }
  }

  draw() {
    // Helper Rect
    if (this.isHelperRect) {
      const boundingRect = this.boundingRect();
      ctx.strokeStyle = 'rgba(127, 127, 127, 1)';
      ctx.strokeRect(boundingRect.x, boundingRect.y, boundingRect.width, boundingRect.height);
    }

    // Body
    ctx.save();
    ctx.translate(this.xPos, this.yPos);
    ctx.rotate(this.bodyRotation);
    ctx.beginPath();
    ctx.arc(0, 0, this.bodyRadius, 0, 2*Math.PI, false);
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fill();

    // Head
    ctx.save();
    ctx.translate(0, -this.bodyRadius);
    ctx.rotate(this.headRotation);
    ctx.beginPath();
    ctx.arc(0, 0, this.bodyRadius/2, 0, 2*Math.PI, false);
    ctx.fillStyle = 'rgba(255, 229, 204, 1)';
    ctx.fill();
    // Hair
    if (this.isHair) {
      for (let i = 0; i <= 6; i++) {
        ctx.save();
        ctx.rotate(Math.PI + (i/6) * Math.PI);
        ctx.beginPath();
        ctx.arc(this.bodyRadius/2, 0, this.bodyRadius/6, 0, 2*Math.PI, false);
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.fill();
        ctx.restore();
      }
      ctx.beginPath();
      ctx.arc(-this.bodyRadius/5, -this.bodyRadius/3, this.bodyRadius/6, 0, 2*Math.PI, false);
      ctx.arc(0, -this.bodyRadius/3, this.bodyRadius/6, 0, 2*Math.PI, false);
      ctx.arc(this.bodyRadius/5, -this.bodyRadius/3, this.bodyRadius/6, 0, 2*Math.PI, false);
      ctx.fillStyle = 'rgba(255, 255, 255, 1)';
      ctx.fill();
    }
    // Eyes
    ctx.beginPath();
    ctx.arc(-this.bodyRadius/6, this.bodyRadius/12, this.bodyRadius/20, 0, 2*Math.PI, false); // Left
    ctx.arc(this.bodyRadius/6, this.bodyRadius/12, this.bodyRadius/20, 0, 2*Math.PI, false); // Right
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fill();
    ctx.restore();

    // Left arm
    ctx.save();
    ctx.translate(-this.bodyRadius, 0);
    ctx.rotate(this.leftArmRotation);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-this.bodyRadius, 0);
    ctx.lineWidth = this.bodyRadius/10;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(-this.bodyRadius, 0, this.bodyRadius/12, 0, 2*Math.PI, false);
    ctx.fillStyle = 'rgba(255, 229, 204, 1)';
    ctx.fill();
    ctx.restore();

    // Right arm
    ctx.save();
    ctx.translate(this.bodyRadius, 0);
    ctx.rotate(this.rightArmRotation);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(this.bodyRadius, 0);
    ctx.lineWidth = this.bodyRadius/10;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(this.bodyRadius, 0, this.bodyRadius/12, 0, 2*Math.PI, false);
    ctx.fillStyle = 'rgba(255, 229, 204, 1)';
    ctx.fill();
    ctx.restore();

    // Restore Original State
    ctx.restore();
  }
}
