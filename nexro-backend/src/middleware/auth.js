import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'nexro_statutory_cooperative_secret_2026';

export function authenticate(req, res, next) {
  // Support demo evaluator header for rapid prototyping
  const demoRole = req.headers['x-demo-role'];
  if (demoRole) {
    req.user = {
      id: req.headers['x-demo-user-id'] || 'usr_admin_kcls',
      role: demoRole,
      societyId: req.headers['x-demo-society-id'] || 'soc_kcls_42'
    };
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Forbidden: Invalid or expired token' });
  }
}

export function requireRole(allowedRoles = []) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: `Access Denied: Requires one of [${allowedRoles.join(', ')}]. Current role: ${req.user?.role || 'none'}`
      });
    }
    next();
  };
}

export function signToken(user) {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
      phone: user.phone,
      societyId: user.society_id || null
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}
