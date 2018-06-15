class Collectible {
  constructor(xPos, yPos, radius) {
    // Metrics
    this.xPos     = xPos;
    this.yPos     = yPos;
    this.radius   = radius;
    this.rotation = 0;
    // Deltas
    this.yPosDelta     = 3;
    this.rotationDelta = 0.04;
    // Helper Rect
    this.isHelperRect = false;
  }

  fall() {
    this.yPos += this.yPosDelta;
  }

  rotate() {
    this.rotation += this.rotationDelta;
  }

  boundingRect() {
    // {x, y, width, height} where (x,y) is for upper-left corner
    return {
      x: this.xPos - (3/2)*this.radius,
      y: this.yPos - (3/2)*this.radius,
      width: 3*this.radius,
      height: 3*this.radius
    }
  }

  draw() {
    if (this.isHelperRect) {
      const boundingRect = this.boundingRect();
      ctx.strokeStyle = 'rgba(127, 127, 127, 1)';
      ctx.strokeRect(boundingRect.x, boundingRect.y, boundingRect.width, boundingRect.height);
    }

    // Main Body
    ctx.save();
    ctx.translate(this.xPos, this.yPos);
    ctx.rotate(this.rotation);
    ctx.beginPath();
    ctx.moveTo(0, -this.radius);
    ctx.lineTo(0, this.radius);
    ctx.strokeStyle = 'rgba(255, 255, 0, 1)';
    ctx.lineWidth = this.radius/10;
    ctx.lineCap = 'round';
    ctx.stroke();
    // Foot
    ctx.beginPath();
    ctx.moveTo(-this.radius/2, this.radius);
    ctx.lineTo(this.radius/2, this.radius);
    ctx.strokeStyle = 'rgba(255, 255, 0, 1)';
    ctx.lineWidth = this.radius/10;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Lamps
    ctx.translate(0, -this.radius);
    // Outer Pair of Lamps
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI, false);
    ctx.strokeStyle = 'rgba(255, 255, 0, 1)';
    ctx.lineWidth = this.radius/10;
    ctx.lineCap = 'round';
    ctx.stroke();
    // 2nd
    ctx.beginPath();
    ctx.arc(0, 0, (3/4)*this.radius, 0, Math.PI, false);
    ctx.strokeStyle = 'rgba(255, 255, 0, 1)';
    ctx.lineWidth = this.radius/10;
    ctx.lineCap = 'round';
    ctx.stroke();
    // 3rd
    ctx.beginPath();
    ctx.arc(0, 0, this.radius/2, 0, Math.PI, false);
    ctx.strokeStyle = 'rgba(255, 255, 0, 1)';
    ctx.lineWidth = this.radius/10;
    ctx.lineCap = 'round';
    ctx.stroke();
    // Inner
    ctx.beginPath();
    ctx.arc(0, 0, this.radius/4, 0, Math.PI, false);
    ctx.strokeStyle = 'rgba(255, 255, 0, 1)';
    ctx.lineWidth = this.radius/10;
    ctx.lineCap = 'round';
    ctx.stroke();
    // Restore
    ctx.restore();
  }
}
