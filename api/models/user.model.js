// import mongoose from "mongoose";
// const { Schema } = mongoose;

// const userSchema = new Schema({
//     username: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
// }, {
//     timestamps: true
// });

// export default mongoose.model('User', userSchema);

import mongoose from "mongoose";

// Admin Model
const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roleType: { 
    type: String, 
    enum: ['superAdmin', 'admin', 'administrator'], 
    required: true 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Administrator Model
const administratorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  department: { type: String, required: true },
  role: { type: String, required: true },
  permissions: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// User Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contactNo: { type: String },
  profilePicture: { type: String },
  address: { type: String },
  dateOfBirth: { type: Date },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Student Model
const studentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  registerNo: { type: String, unique: true, required: true },
  department: { type: String, required: true },
  semester: { type: Number, required: true },
  batch: { type: String, required: true },
  program: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['active', 'inactive', 'graduated', 'suspended'], 
    default: 'active' 
  },
  facultyAdvisor: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Faculty Model
const facultySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  department: { type: String, required: true },
  designation: { type: String, required: true },
  specialization: { type: String },
  qualifications: [{ type: String }],
  status: { 
    type: String, 
    enum: ['active', 'inactive', 'on-leave'], 
    default: 'active' 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Course Model
const courseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  courseCode: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  semester: { type: Number, required: true },
  credits: { type: Number, required: true },
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
  description: { type: String },
  prerequisites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  status: { 
    type: String, 
    enum: ['active', 'inactive', 'upcoming'], 
    default: 'active' 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Assignment Model
const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
  dueDate: { type: Date, required: true },
  maxMarks: { type: Number, required: true },
  attachments: [{ type: String }],
  status: { 
    type: String, 
    enum: ['active', 'draft', 'closed'], 
    default: 'active' 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Submission Model
const submissionSchema = new mongoose.Schema({
  assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  submissionFile: { type: String, required: true },
  submissionDate: { type: Date, default: Date.now },
  remarks: { type: String },
  status: { 
    type: String, 
    enum: ['submitted', 'late', 'rejected'], 
    default: 'submitted' 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// AssignmentGrade Model
const assignmentGradeSchema = new mongoose.Schema({
  submissionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Submission', required: true },
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
  obtainedMarks: { type: Number, required: true },
  feedback: { type: String },
  gradedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Grade Model
const gradeSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  semester: { type: Number, required: true },
  grade: { 
    type: String, 
    enum: ['AS', 'AA', 'AB', 'BB', 'BC', 'CC', 'CD', 'DD'], 
    required: true 
  },
  creditPoints: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Notification Model
const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  type: { 
    type: String, 
    enum: ['assignment', 'course', 'system', 'personal'], 
    required: true 
  },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Registration Request Model
const registrationRequestSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  },
  requestDate: { type: Date, default: Date.now },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Attendance Record Model
const attendanceRecordSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  date: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['present', 'absent', 'late'], 
    required: true 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// ID Card Model
const idCardSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  cardNumber: { type: String, unique: true, required: true },
  issueDate: { type: Date, required: true },
  expiryDate: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['active', 'expired', 'lost'], 
    default: 'active' 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Transcript Model
const transcriptSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  semester: { type: Number, required: true },
  cgpa: { type: Number, required: true },
  totalCredits: { type: Number, required: true },
  remarks: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Bonafide Certificate Model
const bonafideCertificateSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  purpose: { type: String, required: true },
  issuedDate: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ['pending', 'issued', 'rejected'], 
    default: 'pending' 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Fee Receipt Model
const feeReceiptSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  semester: { type: Number, required: true },
  amount: { type: Number, required: true },
  paymentDate: { type: Date, required: true },
  paymentMethod: { 
    type: String, 
    enum: ['cash', 'online', 'cheque'], 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['paid', 'pending', 'overdue'], 
    default: 'pending' 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Remaining models will follow the same pattern...

// Export all models
module.exports = {
  Admin: mongoose.model('Admin', adminSchema),
  Administrator: mongoose.model('Administrator', administratorSchema),
  User: mongoose.model('User', userSchema),
  Student: mongoose.model('Student', studentSchema),
  Faculty: mongoose.model('Faculty', facultySchema),
  Course: mongoose.model('Course', courseSchema),
  Assignment: mongoose.model('Assignment', assignmentSchema),
  Submission: mongoose.model('Submission', submissionSchema),
  AssignmentGrade: mongoose.model('AssignmentGrade', assignmentGradeSchema),
  Grade: mongoose.model('Grade', gradeSchema),
  Notification: mongoose.model('Notification', notificationSchema),
  RegistrationRequest: mongoose.model('RegistrationRequest', registrationRequestSchema),
  AttendanceRecord: mongoose.model('AttendanceRecord', attendanceRecordSchema),
  IDCard: mongoose.model('IDCard', idCardSchema),
  Transcript: mongoose.model('Transcript', transcriptSchema),
  BonafideCertificate: mongoose.model('BonafideCertificate', bonafideCertificateSchema),
  FeeReceipt: mongoose.model('FeeReceipt', feeReceiptSchema)
};