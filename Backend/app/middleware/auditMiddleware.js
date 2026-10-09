const createAuditLog = require("../utils/auditLogger");

const auditMiddleware = ({
  action,
  resource,
  getResourceId = null,
  getDescription = null,
}) => {
  return async (req, res, next) => {
    const originalJson = res.json.bind(res);

    res.json = async (data) => {
      try {
        // Resolve action
        const auditAction =
          typeof action === "function"
            ? action(req, data)
            : action;

        const success =
          res.statusCode >= 200 &&
          res.statusCode < 300;

        let resourceId = null;
        let description = null;

        // Get resource ID
        if (getResourceId) {
          resourceId = await getResourceId(req, data);
        }

        // Get description
        if (getDescription) {
          description = await getDescription(req, data);
        }

        // Success log
        if (success && req.user) {
          await createAuditLog({
            req,
            user: req.user,
            action: auditAction,
            resource,
            resourceId,
            description,
            status: "success",
          });
        }

        // Failed log
        if (!success && req.user) {
          await createAuditLog({
            req,
            user: req.user,
            action: auditAction,
            resource,
            resourceId,
            description:
              data?.message || "Action failed",
            status: "failed",
          });
        }
      } catch (error) {
        console.error(
          "Audit Middleware Error:",
          error
        );
      }

      return originalJson(data);
    };

    next();
  };
};

module.exports = auditMiddleware;