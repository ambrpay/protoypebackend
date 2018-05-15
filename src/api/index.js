import { version } from '../../package.json';
import { Router } from 'express';
import saveData from '../lib/saveData';

export default () => {
    let api = Router();

    // mount the facets resource

    // perhaps expose some API metadata at the root
    api.get('/', (req, res) => {
        res.json({ version });
    });

    api.get('/getFunds', saveData.getFunds);
    api.get('/getFunds/:fromId/:customerId', saveData.getSpecificFunds);
    api.get('/addCustomer/:customerId/:contractId', saveData.addCustomer);
    api.get('/getCustomer/:customerId', saveData.getCustomer);
    api.get('/activity/:customerId', saveData.getActivity);
    api.post('/activity/:customerId', saveData.addActivity);
    api.get('/getProviders', saveData.getProviders);

    return api;
}