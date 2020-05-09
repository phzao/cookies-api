global.SALT_KEY = process.env.SALT_KEY;
global.EMAIL_TMPL = '<strong>{0}</strong>';

module.exports = {
    connectionString: `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:27017`,
    sendgridKey: 'xxxxx',
    userImagesBlobConnectionString: 'TBD'
}