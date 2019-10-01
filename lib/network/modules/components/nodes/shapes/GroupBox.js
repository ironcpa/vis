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
}

export default GroupBox;
