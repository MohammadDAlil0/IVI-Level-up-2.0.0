const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appErorr');
const APIFeatures = require('../utils/apiFeatures');

exports.createOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
        status: 'success',
        data: doc
    });
});

exports.getOne = (Model, populateOptions) => catchAsync(async (req, res, next) => {
    const query = Model.findById(req.params.id);
    if (populateOptions) query.populate(populateOptions);
    const doc = await query;
    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    }   
    res.status(200).json({
        status: 'success',
        data: doc
    });
});

exports.getAll = Model => catchAsync(async (req, res, next) => {
    const freatures = new APIFeatures(Model.find(), req.query)
    .filter()
    .sort()
    .pagination();
    
    const docs = await freatures.query;

    res.status(200).json({
        status: 'success',
        result: docs.length,
        data: docs
    });
});

exports.updateOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data: doc
    });
});

exports.deleteOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});