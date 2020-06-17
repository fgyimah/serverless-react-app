require('dotenv').config();

const Airtable = require('airtable');

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});

const base = Airtable.base(process.env.AIRTABLE_BASE_NAME);
const table = base.table('Table 1');

exports.handler = async (event, context) => {
  try {
    const records = await table.select({}).firstPage();
    const formattedRecords = records.map((record) => ({
      id: record.id,
      fields: record.fields,
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({
        formattedRecords,
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
