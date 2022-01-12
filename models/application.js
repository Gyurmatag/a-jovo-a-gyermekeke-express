const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applicationSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        supportAmount: {
            type: Number,
            required: true
        },
        imageUrls: {
            type: [String],
            required: true
        },
        implementationStart: {
            type: Date,
            required: true
        },
        implementationEnd: {
            type: Date,
            required: true
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Application', applicationSchema);
