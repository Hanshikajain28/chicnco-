const User = require('../models/User');

exports.getWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('wishlist');
    res.json({
      success: true,
      wishlist: user?.wishlist || []
    });
  } catch (error) {
    next(error);
  }
};

exports.toggleWishlist = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User profile not found' });
    }

    const index = user.wishlist.indexOf(productId);
    let added = false;

    if (index > -1) {
      user.wishlist.splice(index, 1);
    } else {
      user.wishlist.push(productId);
      added = true;
    }

    await user.save();
    await user.populate('wishlist');

    res.json({
      success: true,
      added,
      message: added ? 'Saved to your Atelier Wishlist' : 'Removed from your Wishlist',
      wishlist: user.wishlist
    });
  } catch (error) {
    next(error);
  }
};

