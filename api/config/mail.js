const MAIL_TRANSPORT = {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        // TODO: Replace with meku account.
        user: "mekutest1@gmail.com",
        pass: "MeckuT&*1256"
    }
};

module.exports = {MAIL_TRANSPORT};