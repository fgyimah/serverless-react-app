const table = require('./utils/airtable');

exports.handler = async (event) => {
  try {
    const records = await table
      .select({
        sort: [{ field: 'score', direction: 'desc' }],
        filterByFormula: `AND(name != "", score > 0)`,
      })
      .firstPage();
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
      body: JSON.stringify({ error: 'Failed to load records' }),
    };
  }
};
