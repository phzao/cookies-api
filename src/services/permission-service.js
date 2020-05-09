export const admin = "ADMIN";
export const local_employee = "LOCAL_EMPLOYEE";

export const MSG = 'Usuário sem permissão!';

PermissionControl.prototype.hasPermission = (userPermissions, permissionRequired) => {
   if (userPermissions.indexOf(permissionRequired)===-1) {
        return MSG;
   }

   return true;
}

module.exports = PermissionControl;
