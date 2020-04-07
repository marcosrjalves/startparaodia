import bcrypt from 'bcryptjs';

export default function checkPassword(password, hash_password) {
  return bcrypt.compare(password, hash_password);
}
