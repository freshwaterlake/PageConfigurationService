const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
        PORT: Joi.number().default(3008),
        PAGE_CONFIG_FILE_URL: Joi.string().required().description('Page Config File URL'),
        ACTIVITY_CONFIG_FILE_URL: Joi.string().required().description('Activity Config File URL'),
        DOMAIN_DATA_CONFIG_FILE_URL: Joi.string().required().description('Domain Data Config File URL'),
        JWT_SECRET: Joi.string().required().description('JWT secret key'),
        JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
        JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
        JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number().default(10).description('minutes after which reset password token expires'),
        JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number().default(10).description('minutes after which verify email token expires'),
    })
    .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    jwt: {
        secret: envVars.JWT_SECRET,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
        resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
        verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
    },
    fileUrl: {
        pageConfigFileUrl: envVars.PAGE_CONFIG_FILE_URL,
        activityConfigFileUrl: envVars.ACTIVITY_CONFIG_FILE_URL,
        domainDataFileUrl: envVars.DOMAIN_DATA_CONFIG_FILE_URL,
    },
};
