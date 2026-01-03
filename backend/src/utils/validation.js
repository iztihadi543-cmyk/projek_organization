/**
 * Validation Utilities
 * Input validation using express-validator
 */

const { body, param, query } = require('express-validator');

// Common validation rules
const commonValidation = {
  // String validation
  string: (field, min = 1, max = 1000) => {
    return body(field)
      .trim()
      .isLength({ min, max })
      .withMessage(`${field} harus antara ${min}-${max} karakter`);
  },
  
  // Email validation
  email: (field = 'email') => {
    return body(field)
      .isEmail()
      .withMessage('Email tidak valid')
      .normalizeEmail();
  },
  
  // Password validation
  password: (field = 'password', min = 6) => {
    return body(field)
      .isLength({ min })
      .withMessage(`Password minimal ${min} karakter`)
      .matches(/\d/)
      .withMessage('Password harus mengandung angka');
  },
  
  // Date validation
  date: (field) => {
    return body(field)
      .isISO8601()
      .withMessage('Format tanggal tidak valid')
      .toDate();
  },
  
  // Object ID validation
  objectId: (field) => {
    return param(field)
      .isMongoId()
      .withMessage('ID tidak valid');
  }
};

// User validation rules
exports.userValidation = {
  register: [
    body('username')
      .trim()
      .isLength({ min: 3, max: 30 })
      .withMessage('Username harus 3-30 karakter')
      .matches(/^[a-zA-Z0-9_]+$/)
      .withMessage('Username hanya boleh huruf, angka, dan underscore'),
    body('email')
      .isEmail()
      .withMessage('Email tidak valid')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password minimal 6 karakter')
      .matches(/\d/)
      .withMessage('Password harus mengandung angka'),
    body('role')
      .optional()
      .isIn(['admin', 'editor', 'viewer'])
      .withMessage('Role tidak valid')
  ],
  
  login: [
    body('email')
      .isEmail()
      .withMessage('Email tidak valid')
      .normalizeEmail(),
    body('password')
      .notEmpty()
      .withMessage('Password wajib diisi')
  ],
  
  update: [
    body('username')
      .optional()
      .trim()
      .isLength({ min: 3, max: 30 })
      .withMessage('Username harus 3-30 karakter'),
    body('email')
      .optional()
      .isEmail()
      .withMessage('Email tidak valid')
      .normalizeEmail(),
    body('role')
      .optional()
      .isIn(['admin', 'editor', 'viewer'])
      .withMessage('Role tidak valid')
  ]
};

// Berita validation rules
exports.beritaValidation = {
  create: [
    body('title')
      .trim()
      .isLength({ min: 5, max: 200 })
      .withMessage('Judul harus 5-200 karakter'),
    body('content')
      .trim()
      .isLength({ min: 20 })
      .withMessage('Konten minimal 20 karakter'),
    body('category')
      .optional()
      .isIn(['berita', 'pengumuman', 'artikel', 'liputan'])
      .withMessage('Kategori tidak valid'),
    body('status')
      .optional()
      .isIn(['draft', 'published', 'archived'])
      .withMessage('Status tidak valid'),
    body('tags')
      .optional()
      .isArray()
      .withMessage('Tags harus array')
  ],
  
  update: [
    body('title')
      .optional()
      .trim()
      .isLength({ min: 5, max: 200 })
      .withMessage('Judul harus 5-200 karakter'),
    body('status')
      .optional()
      .isIn(['draft', 'published', 'archived'])
      .withMessage('Status tidak valid')
  ]
};

// Agenda validation rules
exports.agendaValidation = {
  create: [
    body('title')
      .trim()
      .isLength({ min: 5, max: 200 })
      .withMessage('Judul harus 5-200 karakter'),
    body('description')
      .trim()
      .isLength({ min: 10 })
      .withMessage('Deskripsi minimal 10 karakter'),
    body('date')
      .isISO8601()
      .withMessage('Tanggal tidak valid')
      .toDate(),
    body('location')
      .trim()
      .notEmpty()
      .withMessage('Lokasi wajib diisi'),
    body('category')
      .optional()
      .isIn(['latihan', 'pelatihan', 'acara', 'rakor', 'lomba', '的其他'])
      .withMessage('Kategori tidak valid')
  ]
};

// Galeri validation rules
exports.galeriValidation = {
  create: [
    body('title')
      .trim()
      .isLength({ min: 3, max: 200 })
      .withMessage('Judul harus 3-200 karakter'),
    body('type')
      .optional()
      .isIn(['photo', 'video'])
      .withMessage('Type tidak valid'),
    body('category')
      .optional()
      .isIn(['kegiatan', 'latihan', 'acara', 'lomba', 'pendidikan', '的其他'])
      .withMessage('Kategori tidak valid'),
    body('videoUrl')
      .optional()
      .isURL()
      .withMessage('Video URL tidak valid')
  ]
};

// Anggota validation rules
exports.anggotaValidation = {
  create: [
    body('nama')
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Nama harus 2-100 karakter'),
    body('jabatan')
      .trim()
      .notEmpty()
      .withMessage('Jabatan wajib diisi'),
    body('kategori')
      .optional()
      .isIn(['pengurus', 'anggota', ' Alumni', 'pendamping'])
      .withMessage('Kategori tidak valid'),
    body('tingkat')
      .optional()
      .isIn(['Siaga', 'Penggalang', 'Penegak', 'Pandega', 'dewasa'])
      .withMessage('Tingkat tidak valid'),
    body('status')
      .optional()
      .isIn(['aktif', 'nonaktif', 'alumni'])
      .withMessage('Status tidak valid')
  ]
};

// Pagination validation
exports.paginationValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page harus angka positif')
    .toInt(),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit harus 1-100')
    .toInt()
];

// Search validation
exports.searchValidation = [
  query('search')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Search minimal 2 karakter')
];

// Export objectId validation for direct use
exports.validateObjectId = (field) => {
  return param(field)
    .isMongoId()
    .withMessage('ID tidak valid');
};

