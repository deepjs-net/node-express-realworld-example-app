import path from 'path'
import log4js from 'log4js'
import config from '../config'

const env = process.env.NODE_ENV || 'development'

log4js.configure({
  appenders: {
    out: { type: 'console' },
    app: {
      type: 'file',
      filename: path.join(config.log_dir, 'cheese.log'),
      category: 'cheese',
    },
  },
  categories: {
    default: { appenders: ['out', 'app'], level: 'error' },
  },
})

const logger = log4js.getLogger('cheese')

logger.level = config.debug && env !== 'test' ? 'DEBUG' : 'ERROR'

export default logger
