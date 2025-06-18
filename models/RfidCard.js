import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

const rfidCardSchema = new mongoose.Schema({
  cardUid: {
    type: String,
    required: [true, 'RFID card UID is required'],
    unique: true,
    trim: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  pin: {
  type: String,
  required: [true, 'PIN is required'],
  validate: {
    validator: function(value) {
      // Skip validation for hashed PINs (they start with $2a$ or $2b$)
      if (value && value.startsWith('$2')) {
        return true;
      }
      // Only validate raw PINs - must be exactly 4 digits
      return /^\d{4}$/.test(value);
    },
    message: 'PIN must be exactly 4 digits'
  },
  select: false // Don't include PIN in queries by default
},
  pinAttempts: {
    type: Number,
    default: 0,
    max: [3, 'Maximum 3 PIN attempts allowed']
  },
  pinLockedUntil: {
    type: Date
  },
  lastPinChange: {
    type: Date,
    default: Date.now
  },
  requiresPinChange: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastUsed: {
    type: Date
  },
  issuedAt: {
    type: Date,
    default: Date.now
  },
  expiryDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE', 'LOST', 'EXPIRED', 'PENDING_ACTIVATION', 'PIN_LOCKED'],
    default: 'PENDING_ACTIVATION'
  }
});

const RfidCard = mongoose.model('RfidCard', rfidCardSchema);
export default RfidCard;