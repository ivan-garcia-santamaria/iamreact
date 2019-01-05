import { URL_USERS, URL_GROUPS } from '../../constants';
import axios from 'axios';
import MasterTables from '../masterTables/MasterTables';

const masterTables = new MasterTables();

export default class UsersHelper {
    addGroups = (userId, groups, accessToken) => {
        if (groups === undefined || groups.length === 0) {
            // array empty or does not exist
            return;
        }
        console.log(`añadiendo los grupos al usuario ${userId}`)
        return axios.patch(`${URL_USERS}/${userId}/groups`,
            masterTables.convertOptionsSimpleArray(groups), {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }).then(res => {
            console.log(res);
            if (res.status === 204) {
                console.log("grupos asignados");

            }
        }).catch(error => {
            console.log("capturando error en grupos");
        });
    }

    delGroup = (userId, groups, accessToken) => {
        if (groups === undefined || groups.length === 0) {
            // array empty or does not exist
            return;
        }
        let group = groups[0].value;
        let user = [];
        user.push(userId);
        const headers = {
            "Authorization": `Bearer ${accessToken}`
        }
        const data =
            JSON.stringify(user);

        return axios.delete(`${URL_GROUPS}/${group}/members`, {
            headers,
            data
        }).then(res => {
            console.log(res);
            if (res.status === 204) {
                console.log("grupo borrado");

            }
        }).catch(error => {
            console.log("capturando error en borrando grupos");
        });
    }

    addRoles = (userId,roles,accessToken) => {
        if (roles === undefined || roles.length === 0) {
            // array empty or does not exist
            return;
        }
        console.log(`añadiendo los roles al usuario ${userId}`)
        return axios.patch(`${URL_USERS}/${userId}/roles`,
            masterTables.convertOptionsSimpleArray(roles), {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }).then(res => {
            console.log(res);
            if (res.status === 204) {
                console.log("roles asignados");

            }
        }).catch(error => {
            console.log("capturando error en roles");
        });
    }

    delRole = (userId, roles, accessToken) => {
        if (roles === undefined || roles.length === 0) {
            // array empty or does not exist
            return;
        }
        const headers = {
            "Authorization": `Bearer ${accessToken}`
        }
        const data =
            masterTables.convertOptionsSimpleArray(roles);

        return axios.delete(`${URL_USERS}/${userId}/roles`, {
            headers,
            data
        }).then(res => {
            console.log(res);
            if (res.status === 204) {
                console.log("roles borrado");

            }
        }).catch(error => {
            console.log("capturando error en borrando roles");
        });
    }

}