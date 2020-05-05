global.SALT_KEY = 'f5b99242-6504-4ca3-90f2-05e78e5761ef';
global.EMAIL_TMPL = '<strong>{0}</strong>';

module.exports = {
    connectionString: `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:27017`,
    sendgridKey: 'xxxxx',
    userImagesBlobConnectionString: 'TBD'
}