require('dotenv').config();

const Airtable = require('airtable');

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});

const base = Airtable.base(process.env.AIRTABLE_BASE_NAME);
const table = base.table('Table 1');

module.exports = {
  table,
};
