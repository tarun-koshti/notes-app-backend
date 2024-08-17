import { Schema, model, Types } from 'mongoose';

interface InterfaceNotes {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  notesId: Types.ObjectId;
  title: string;
  content: string;
  isPublic: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const notesSchema = new Schema<InterfaceNotes>(
  {
    userId: {
      type: Schema.ObjectId,
      required: [true, 'Please provide us userId'],
      ref: 'User',
    },
    notesId: {
      type: Schema.ObjectId,
      ref: 'Notes',
    },
    title: {
      type: String,
      maxlength: [100, 'Title can Contains Maximum 100 Characters'],
      required: [true, 'Please provide us Notes Title'],
    },
    content: {
      type: String,
      maxlength: [10000, 'Content can Contains Maximum 10000 Characters'],
      required: [true, 'Please provide us Notes Content'],
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    toObject: { virtuals: true },
    timestamps: true,
  }
);

export const Notes = model('Notes', notesSchema);
