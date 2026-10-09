const AuditLog = require("../models/AuditLog");
const User = require("../models/User");

const createAuditLog = async ({
  req,
  user,
  action,
  resource,
  resourceId = null,
  description = null,
  status = "success",
  metadata = null,
}) => {
  try {
    // Get user name from JWT first
    let userName = user?.name || null;

    // JWT currently contains id, not name.
    // So fetch the name from database if needed.
    if (!userName && user?.id) {
      const dbUser = await User.findById(user.id).select("name");

      if (dbUser) {
        userName = dbUser.name;
      }
    }

    await AuditLog.create({
      userId: user?._id || user?.id || null,
      userName,
      userRole: user?.role || null,

      action,
      resource,
      resourceId,

      description,
      status,

      ipAddress:
        req.headers["x-forwarded-for"] ||
        req.socket?.remoteAddress ||
        null,

      userAgent: req.headers["user-agent"] || null,

      metadata,
    });
  } catch (error) {
    console.error("Audit Log Error:", error);
  }
};

module.exports = createAuditLog;