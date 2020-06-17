const Airtable = require('airtable');

Airtable.configure({
  apiKey: 'keycc6T6KDZdiAV4U',
});

const base = Airtable.base('appMTPlesSk16mr6H');
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
