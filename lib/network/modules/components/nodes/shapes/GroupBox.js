'use strict';

import ShapeBase from '../util/ShapeBase'

/**
 * A Square Node/Cluster shape.
 *
 * @extends ShapeBase
 */
class GroupBox extends ShapeBase {
  /**
   * @param {Object} options
   * @param {Object} body
   * @param {Label} labelModule
   */
  constructor(options, body, labelModule) {
    super(options, body, labelModule)
    this.width = options.width;
    this.height = options.height;
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {boolean} [selected]
   * @param {boolean} [hover]
   * @param {Object} [values={size: this.options.size}]
   */
  resize(ctx, selected = this.selected, hover = this.hover) {
    if (this.needsRefresh(selected, hover)) {
      this.labelModule.getTextSize(ctx, selected, hover);
      // var size = 2 * values.size;
      this.width = this.options.width;
      this.height = this.options.height;
      this.size = this.width * this.height;
      this.radius = 0.5*this.width;
    }
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {string} shape
   * @param {number} sizeMultiplier - Unused! TODO: Remove next major release
   * @param {number} x
   * @param {number} y
   * @param {boolean} selected
   * @param {boolean} hover
   * @param {ArrowOptions} values
   * @private
   */
  _drawShape(ctx, shape, sizeMultiplier, x, y, selected, hover, values) {
    this.resize(ctx, selected, hover, values);
    this.left = x - this.width / 2;
    this.top = y - this.height / 2;

    this.initContextForDraw(ctx, values);
    ctx[shape](x, y, this.width, this.height);   // override here! from ShapeBase._drawShape
    this.performFill(ctx, values);
    
    if (this.options.icon !== undefined) {
      if (this.options.icon.code !== undefined) {
        ctx.font = (selected ? "bold " : "")
            + (this.height / 2) + "px "
            + (this.options.icon.face || 'FontAwesome');
        ctx.fillStyle = this.options.icon.color || "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.options.icon.code, x, y);
      }
    }

    if (this.options.label !== undefined) {
      // Need to call following here in order to ensure value for `this.labelModule.size.height`
      this.labelModule.calculateLabelSize(ctx, selected, hover, x, y, 'hanging')
      let yLabel = y - 0.5 * this.height - 1.5 * this.labelModule.size.height;
      this.labelModule.draw(ctx, x, yLabel, selected, hover, 'hanging');
    }

    if (selected) {
      var handleSize = 10
      ctx['box'](x - this.width / 2, y - this.height / 2, handleSize)
      this.performFill(ctx, values)
      ctx['box'](x + this.width / 2 - handleSize, y - this.height / 2, handleSize)
      this.performFill(ctx, values)
      ctx['box'](x + this.width / 2 - handleSize, y + this.height / 2 - handleSize, handleSize)
      this.performFill(ctx, values)
      ctx['box'](x - this.width / 2, y + this.height / 2 - handleSize, handleSize)
      this.performFill(ctx, values)
    }

    this.updateBoundingBox(x,y);
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} x width
   * @param {number} y height
   * @param {boolean} selected
   * @param {boolean} hover
   * @param {ArrowOptions} values
   */
  draw(ctx, x, y, selected, hover, values) {
    // this._drawShape(ctx, 'square', 2, x, y, selected, hover, values);
    this._drawShape(ctx, 'groupBox', 2, x, y, selected, hover, values);
    // ctx.fillRect(x, y, this.width, this.height);
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} angle
   * @returns {number}
   */
  distanceToBorder(ctx, angle) {
    return this._distanceToBorder(ctx,angle);
  }

  /**
   *
   * @param {Object} canvasPos
   * @returns {boolean} is position in handle
   */
  isOnResizeHandle(canvasPos) {
    let x = canvasPos.x;
    let y = canvasPos.y;
    // let handleSize = 20;
    let handleSize = 10;

    let xPos = null;
    console.log('isOnResizeHandle', x, this.left)
    if (x >= this.left && x <= this.left + handleSize)
        xPos = 'left';
    else if (x >= this.left + this.width - handleSize && x <= this.left + this.width)
        xPos = 'right';

    let yPos = null;
    if (y > this.top && y <= this.top + handleSize)
        yPos = 'top';
    else if (y > this.top + this.height - handleSize && y <= this.top + this.height)
        yPos = 'bottom';
    
    if (xPos && yPos)
      return {x: xPos, y: yPos};
    else
      return null;

    // // in top-left handle
    // if ((x >= this.left
    //     && x <= this.left + handleSize)
    //   && (y > this.top
    //     && y <= this.top + handleSize))
    //   return {x: 'left', y: 'top'};
    // // in top-right handle
    // if ((x >= this.left + this.width - handleSize
    //     && x <= this.left + this.width)
    //   && (y > this.top
    //     && y <= this.top + handleSize))
    //   return {x: 'right', y: 'top'};
    // // in bottom-right handle
    // if ((x >= this.left + this.width - handleSize
    //     && x <= this.left + this.width)
    //   && (y > this.top + this.height - handleSize
    //     && y <= this.top + this.height))
    //   return {x: 'right', y: 'bottom'};
    // // in bottom-left handle
    // if ((x >= this.left
    //     && x <= this.left + handleSize)
    //   && (y >= this.top + this.height - handleSize
    //     && y <= this.top + this.height))
    //   return {x: 'left', y: 'bottom'};
    // return null;
  }

}

export default GroupBox;
