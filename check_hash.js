const crypto = require('crypto');
const key = 'ep_ebadcd9fb65ee283d9e2c98255e40785fa28803e5eeff6';
const hash = crypto.createHash('sha256').update(key).digest('hex');
console.log('Key:', key);
console.log('Hash:', hash);

const key2 = 'ebadcd9fb65ee283d9e2c98255e40785fa28803e5eeff6';
const hash2 = crypto.createHash('sha256').update(key2).digest('hex');
console.log('Key2:', key2);
console.log('Hash2:', hash2);
