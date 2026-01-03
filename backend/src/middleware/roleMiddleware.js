/**
 * Role Middleware
 * Memeriksa role user untuk akses route tertentu
 */

/**
 * Middleware untuk memeriksa role
 * @param  {...string} roles - Role yang diizinkan
 * @returns Middleware function
 */
const checkRole = (...roles) => {
  return (req, res, next) => {
    // Pastikan user sudah terautentikasi
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Akses ditolak. Silakan login terlebih dahulu.'
      });
    }

    // Check apakah role user termasuk dalam list role yang diizinkan
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Akses ditolak. Role '${req.user.role}' tidak memiliki akses ke resource ini.`
      });
    }

    next();
  };
};

/**
 * Middleware khusus untuk admin only
 */
const adminOnly = (req, res, next) => {
  checkRole('admin')(req, res, next);
};

/**
 * Middleware untuk admin dan editor
 */
const adminOrEditor = (req, res, next) => {
  checkRole('admin', 'editor')(req, res, next);
};

/**
 * Middleware untuk memastikan user tidak viewer
 */
const notViewer = (req, res, next) => {
  checkRole('admin', 'editor')(req, res, next);
};

module.exports = {
  checkRole,
  adminOnly,
  adminOrEditor,
  notViewer
};

