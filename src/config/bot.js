/**
 * Bot Config
 * @type {{guild: {id: string}, token: string}}
 */
module.exports = {
    token: '',
    guild: {
        id: '',
        channel: {
            default: '',
            /* Yeni özellik için minik bir adım.
             * admin: ''
             */
        },
        activity: {
            name: '',
            type: ''
        }
    }
}