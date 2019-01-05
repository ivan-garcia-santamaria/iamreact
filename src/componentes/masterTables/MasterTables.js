import { URL_GROUPS,URL_ROLES, URL_BRANDS, URL_APPS } from '../../constants';
import axios from 'axios';

export default class MasterTables {

    constructor() {
        this.translateResponse = this.translateResponse.bind(this);
        this.translateResponseApps = this.translateResponseApps.bind(this);
        this.translateResponseBrands = this.translateResponseBrands.bind(this);
        this.getApps = this.getApps.bind(this);
        this.getGroups = this.getGroups.bind(this);
        this.getRoles = this.getRoles.bind(this);
        this.getBrands = this.getBrands.bind(this);
        this.convertOptionsSimpleArray = this.convertOptionsSimpleArray.bind(this);
    }

    convertOptionsSimpleArray = (options) => {
        var arr = [];
        for (var key in options) {
            arr.push(options[key].value);
        }
        return arr;
    }

    translateResponse = (resArr) => {
        console.log(resArr);
        var arr = [];
        for (var key in resArr) {
            const opcion = {
                value: resArr[key]._id,
                label: resArr[key].name
            }
            arr.push(opcion);
        }
        console.log(arr);
        return arr;
    }

    translateResponseApps = (res) => {
        console.log(res);
        var arr = [];
        for (var key in res.data) {
            const opcion = {
                value: res.data[key].client_id,
                label: res.data[key].name
            }
            arr.push(opcion);
        }
        return arr;
    }

    translateResponseBrands = (res) => {
        console.log(res);
        var arr = [];
        for (var key in res.data) {
            const opcion = {
                value: res.data[key].id,
                label: res.data[key].name
            }
            arr.push(opcion);
        }
        return arr;
    }

    getApps = (accessToken) => {
        console.log("buscando apPs");
        
        return axios.get(`${URL_APPS}`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }

        });
        
    }

    getGroups = (accessToken) => {
        console.log("buscando grupos");
        return axios.get(`${URL_GROUPS}`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });
    }

    getRoles = (accessToken) => {
        console.log("buscando roles");
        return axios.get(`${URL_ROLES}`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });
    }

    getBrands = () => {
        console.log("buscando brands");
        return axios.get(`${URL_BRANDS}`, {
            headers: {}
        });
    }

}