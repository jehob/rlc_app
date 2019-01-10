/*
 * rlcapp - record and organization management software for refugee law clinics
 * Copyright (C) 2019  Dominik Walser
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>
 ******************************************************************************/

import { Filterable } from "../../shared/models/filterable.model";

export class Permission implements Filterable {
    constructor(
        public id: string,
        public name: string
    ) {
        this.id = id;
        this.name = name;
    }

    static getPermissionsFromJsonArray(jsonArray) {
        const permissions: Array<Permission> = [];
        Object.values(jsonArray).forEach((permission: {
            id;
            name;
        }) => {
            permissions.push(Permission.getPermissionFromJson(permission));
        });
        return permissions;
    }

    static getPermissionFromJson(json: {
        id;
        name
    }) {
        return new Permission(
            json.id,
            json.name
        );
    }

    getFilterableProperty() {
        return this.name;
    }
}

export class HasPermission{
    constructor(
        public id: string,
        public permission_id: string,
        public userHas: string,
        public groupHas: string,
        public rlcHas: string,
        public forUser: string,
        public forGroup: string,
        public forRlc: string
    ) {
        this.id = id;
        this.permission_id = permission_id;
        this.userHas = userHas;
        this.groupHas = groupHas;
        this.rlcHas = rlcHas;
        this.forUser = forUser;
        this.forGroup = forGroup;
        this.forRlc = forRlc;
    }

    static getPermissionsFromJsonArray(jsonArray) {
        const hasPermissions: Array<HasPermission> = [];
        Object.values(jsonArray).forEach((permission: {
            id;
            permission;
            user_has_permission;
            group_has_permission;
            rlc_has_permission;
            permission_for_user;
            permission_for_group;
            permission_for_rlc;
        }) => {
            hasPermissions.push(HasPermission.getHasPermissionFromJson(permission));
        });
        return hasPermissions;
    }

    static getHasPermissionFromJson(json: {
        id;
        permission;
        user_has_permission;
        group_has_permission;
        rlc_has_permission;
        permission_for_user;
        permission_for_group;
        permission_for_rlc;
    }) {
        return new HasPermission(
            json.id,
            json.permission,
            json.user_has_permission,
            json.group_has_permission,
            json.rlc_has_permission,
            json.permission_for_user,
            json.permission_for_group,
            json.permission_for_rlc
        );
    }
}
