/**
 * 给所有的 Model 扩展功能
 * http://mongoosejs.com/docs/plugins.html
 */

import util from '../../utils'

export default function(schema) {
  schema.methods.create_at_ago = function() {
    return util.formatDate(this.create_at, true)
  }

  schema.methods.update_at_ago = function() {
    return util.formatDate(this.update_at, true)
  }
}
