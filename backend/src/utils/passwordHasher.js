import bcrypt from 'bcryptjs';

export default function passwordHasher(password) {
  return bcrypt.hash(password, 8);
}
