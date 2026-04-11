const ROLES = {
  VIEWER: "viewer",
  ANALYST: "analyst",
  ADMIN: "admin"
};

const ROLE_PERMISSIONS = {
  // =======================================================
  // ✅ FIXED: Viewer should also read records
  // =======================================================
  [ROLES.VIEWER]: ["dashboard:read", "records:read"],

  [ROLES.ANALYST]: ["dashboard:read", "records:read"],

  [ROLES.ADMIN]: [
    "dashboard:read",
    "records:read",
    "records:write",
    "users:read",
    "users:write"
  ]
};

module.exports = {
  ROLES,
  ROLE_PERMISSIONS
};