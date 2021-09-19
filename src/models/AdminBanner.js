const { Schema, model } = require('mongoose');

const bannerAdminSchema = new Schema(
    {
        imgBannerAdminKey: String,
        imgBannerAdminUrl: String,
    },
    {
        timestamps: true
    }
)

module.exports = model('bannerAdmin', bannerAdminSchema);