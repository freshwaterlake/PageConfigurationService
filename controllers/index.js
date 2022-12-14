import { Router } from 'express';

export default () => {
    let api = Router();
    api.use('/auth', auth);
};
