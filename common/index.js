import Libs from './libs/index.js'
import * as Verify from './libs/verify.js'

import Mixins from './mixins/index.js'
import DBMixin from './mixins/db.mixin.js'

uni['$com'] = Libs
uni['$verify'] = Verify

const install = (Vue) => {
    Vue.prototype['$com'] = Libs
	Vue.prototype['$verify'] = Verify
    Vue.mixin(Mixins).mixin(DBMixin)
}

export default {
    install
}