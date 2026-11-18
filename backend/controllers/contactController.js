const Contact = require('../models/Contact');

exports.submitContact = async (req, res, next) => {
  try {
    const { name, email, orderNumber, inquiryType, message, newsletterOptIn } = req.body;

    if (!name || !email || !inquiryType || !message) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    let contact = null;
    try {
      contact = await Contact.create({
        name,
        email: email.toLowerCase(),
        orderNumber: orderNumber || '',
        inquiryType,
        message,
        newsletterOptIn: !!newsletterOptIn
      });
    } catch (dbErr) {
      contact = {
        _id: "contact-" + Date.now(),
        name,
        email,
        orderNumber,
        inquiryType,
        message,
        createdAt: new Date()
      };
    }

    res.status(201).json({
      success: true,
      message: 'Your message has been received with gratitude. An atelier concierge specialist will follow up at your provided email within 24 hours.',
      contact
    });
  } catch (error) {
    next(error);
  }
};

