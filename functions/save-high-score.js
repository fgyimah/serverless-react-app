require('dotenv').config();

const Airtable = require('airtable');

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});

const base = Airtable.base(process.env.AIRTABLE_BASE_NAME);
const table = base.table('Table 1');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 400,
      body: JSON.stringify({ err: 'Method not Allowed!' }),
    };
  }

  const { score, name } = JSON.parse(event.body);

  if (typeof score === 'undefined' || !score || !name) {
    return {
      statusCode: 400,
      body: JSON.stringify({ err: 'Bad Request!' }),
    };
  }

  try {
    const records = await table
      .select({
        sort: [{ field: 'score', direction: 'desc' }],
      })
      .firstPage();
    const formattedRecords = records.map((record) => ({
      id: record.id,
      fields: record.fields,
    }));

    const lowest = formattedRecords[9];

    if (
      typeof lowest.fields.score === 'undefined' ||
      score > lowest.fields.score
    ) {
      const updatedRecord = {
        id: lowest.id,
        fields: {
          score,
          name,
        },
      };

      await table.update([updatedRecord]);
      return {
        statusCode: 200,
        body: JSON.stringify(updatedRecord),
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({}),
      };
    }
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        err: 'Failed to save score in Airtabl',
      }),
    };
  }
};
