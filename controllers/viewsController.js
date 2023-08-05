const AppError = require('../Utils/appError');
const catchAsync = require('../Utils/catchAsync');
const Booking = require('../models/bookingModel');
const Tour = require('../models/tourModel');
const User = require('../models/userModel');

exports.alerts = (req, res, next) => {
    const { alert } = req.query;
    if (alert === 'booking') {
        console.log(alert);
        console.log(res.locals);
        res.locals.alert =
            "Your booking was successful! Please check your email for a confirmation.If your booking doesn't show uo here immediatly. please come back later.";
    }
    next();
};

exports.getOverview = catchAsync(async (req, res, next) => {
    // 1) Get tour data from collection
    const tours = await Tour.find();

    // 2) Build template

    // 3) Render that template using tour data from 1

    res.status(200).render('overview', {
        title: 'All Tours',
        tours,
    });
});

exports.getTour = catchAsync(async (req, res, next) => {
    // 1) get the data, for the requested tour (including reviews and guides).
    const tour = await Tour.findOne({ slug: req.params.slug }).populate({
        path: 'reviews',
        fields: 'review rating user',
    });

    if (!tour) {
        return next(new AppError('There is no tour with that name.', 404));
    }

    // 2) Build template

    // 3) Render that template using tour data from 1

    res.status(200).render('tour', {
        title: `${tour.name} Tour`,
        tour,
    });
});

exports.getLoginForm = catchAsync(async (req, res, next) => {
    // 1) get the data, for the requested tour (including reviews and guides).

    // 2) Build template

    // 3) Render that template using tour data from 1

    res.status(200).render('login', {
        title: `Log into your account`,
    });
});

exports.getAccount = (req, res) => {
    res.status(200).render('account', {
        title: 'Your account',
    });
};

exports.getMyTours = catchAsync(async (req, res) => {
    // 1) Find all bookings
    const bookings = await Booking.find({ user: req.user.id });

    // 2) find tours with the returned IDs
    const tourIDs = bookings.map((el) => el.tour);
    const tours = await Tour.find({ _id: { $in: tourIDs } });
    // console.log(bookings);
    res.status(200).render('overview', {
        title: 'My Tours',
        tours,
    });
});

exports.updateUserData = catchAsync(async (req, res) => {
    const updateUser = await User.findByIdAndUpdate(
        req.user.id,
        {
            name: req.body.name,
            email: req.body.email,
        },
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(200).render('account', {
        title: 'Your account',
        user: updateUser,
    });
});
